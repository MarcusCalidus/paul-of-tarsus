#!/usr/bin/env node
// The trailer of Paul of Tarsus, made from the game itself (needs Node 22+, Google Chrome and ffmpeg).
//   node tools/trailer/trailer.mjs video [en de]          the trailer, in each language: tools/trailer/out/trailer-<lang>.mp4
//   node tools/trailer/trailer.mjs stills [lang] [shot...] three frames of each shot (or of those named) on one sheet, to check a shot
//   node tools/trailer/trailer.mjs music                  render the score to tools/trailer/out/music.wav, and print its shape
//   node tools/trailer/trailer.mjs levels                 the level of each track of the score on its own, to check the balance
//   node tools/trailer/trailer.mjs info <chapter>         a chapter's rooms, story flags, entrances and who stands in each room
// The game runs in headless Chrome from a copy of index.html whose <base> points back at the repository, as in tools/playtest.mjs.
// The film is shot in the game: tools/trailer/clock.js makes the game keep time by a clock the recorder steps one frame at a time,
// tools/trailer/shots.js says what each shot shows, and every frame is a screenshot of the page, at 1920 x 1080. The music is rendered
// offline (tools/trailer/music.js, tools/trailer/score.js). What it writes goes to tools/trailer/out/ (or $TRAILER_OUT), which is not
// committed.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.join(here,'..','..');
const CHROME=process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FFMPEG=process.env.FFMPEG||'ffmpeg';
const out=process.env.TRAILER_OUT||path.join(here,'out');
const [cmd='video',...args]=process.argv.slice(2);
const W=1920,H=1080;
fs.mkdirSync(out,{recursive:true});
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'paul-trailer-'));
const game=fs.readFileSync(path.join(root,'index.html'),'utf8'),base=`<base href="${pathToFileURL(root+path.sep).href}">`;
/* two pages: one plays the game on the trailer's clock and films it; the other renders the music, on the real clock */
fs.writeFileSync(path.join(tmp,'film.html'),game.replace('<head>',`<head>${base}<script src="tools/trailer/clock.js"></script>`)
  .replace('</body>','<script src="tools/trailer/shots.js"></script></body>'));
fs.writeFileSync(path.join(tmp,'music.html'),game.replace('<head>',`<head>${base}`)
  .replace('</body>','<script src="tools/trailer/music.js"></script><script src="tools/trailer/score.js"></script></body>'));
const prof=path.join(tmp,'profile');
const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--mute-audio','--hide-scrollbars','--remote-debugging-port=0','--force-device-scale-factor=1',
  '--allow-file-access-from-files',`--user-data-dir=${prof}`,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function target(){for(let i=0;i<60;i++){try{const port=fs.readFileSync(path.join(prof,'DevToolsActivePort'),'utf8').split('\n')[0].trim();
  const j=await(await fetch(`http://127.0.0.1:${port}/json`)).json();const p=j.find(t=>t.type==='page');if(p)return p.webSocketDebuggerUrl}catch{}await sleep(250)}
  throw new Error('Chrome did not start')}
const run=(bin,argv,opt={})=>new Promise((res,rej)=>{const p=spawn(bin,argv,{stdio:['ignore','pipe','pipe'],...opt});let o='',e='';
  p.stdout.on('data',d=>o+=d);p.stderr.on('data',d=>e+=d);p.on('close',c=>c?rej(new Error(bin+' failed: '+e.slice(-2000))):res(o+e))});
let code=0,ws;
try{
  ws=new WebSocket(await target());await new Promise(r=>ws.onopen=r);
  let id=0;const pend=new Map(),logs=[];
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id)}
    if(m.method==='Runtime.consoleAPICalled'&&/error|warn/.test(m.params.type))logs.push(m.params.args.map(a=>a.value??a.description).join(' '));
    if(m.method==='Runtime.exceptionThrown')logs.push('EXCEPTION '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text))};
  const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});
  const ev=async x=>{const r=await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true});
    if(r.error)throw new Error(r.error.message);
    if(r.result?.exceptionDetails)throw new Error(r.result.exceptionDetails.exception?.description||r.result.exceptionDetails.text);return r.result?.result?.value};
  const flushLogs=tag=>{if(logs.length){console.log(logs.splice(0).map(l=>'  console ('+tag+'): '+l).join('\n'))}};
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:W,height:H,deviceScaleFactor:1,mobile:false});
  const open=async(page,lang)=>{await send('Page.navigate',{url:pathToFileURL(path.join(tmp,page)).href+(lang?'?lang='+lang:'')});
    for(let i=0;i<120;i++){await sleep(250);if(await ev(page==='film.html'?"typeof TRAILER!=='undefined'&&TRAILER.ready()":"typeof TR!=='undefined'&&!!TR.SCORE").catch(()=>false))return}
    throw new Error(page+' did not get ready')};
  const shot=async()=>Buffer.from((await send('Page.captureScreenshot',{format:'png'})).result.data,'base64');

  if(cmd==='music'||cmd==='levels'){await open('music.html');
    const bad=await ev(`(()=>{const bad=[],sc=TR.SCORE;for(const tr of sc.tracks){
      if(tr.prog){const n=tr.prog.replace(/\\s/g,'').length;if(n!==sc.bars)bad.push(tr.name+': prog has '+n+' bars, not '+sc.bars)}
      for(const b in tr.lines||{})if(+b>=sc.bars)bad.push(tr.name+': a note in bar '+b+', past the end')}return bad})()`);
    if(bad.length){console.log(bad.map(b=>'FAIL '+b).join('\n'));code=1}
    if(cmd==='music'){const t0=Date.now(),r=await ev('TR.wav(TR.SCORE)'),PART=4<<20;let b64='';
      for(let i=0;i*PART<r.size;i++)b64+=await ev(`TR.part(${i},${PART})`);
      const file=path.join(out,'music.wav');fs.writeFileSync(file,Buffer.from(b64,'base64'));
      const sc=await ev('(s=>({title:s.title,dt:s.dt,bars:s.bars,sections:s.sections}))(TR.SCORE)');
      fs.writeFileSync(path.join(out,'music.json'),JSON.stringify({...sc,seconds:r.seconds,barLevels:r.bars,start:.25},null,1));
      console.log(`=== ${sc.title}: ${r.seconds} s, peak before evening out ${r.peak} dBFS, rendered in ${((Date.now()-t0)/1000).toFixed(1)} s -> ${path.relative(root,file)}`);
      const secs=new Map(sc.sections.map(([b,s])=>[b,s]));
      console.log(r.bars.map((l,i)=>`  bar ${String(i).padStart(2)} ${(.25+i*16*sc.dt).toFixed(2).padStart(6)} s ${String(l).padStart(6)} dB ${'#'.repeat(Math.max(0,Math.round((l+60)/1.5)))}${secs.has(i)?'  <- '+secs.get(i):''}`).join('\n'))}
    else{const L=await ev('TR.levels(TR.SCORE)');console.log('=== each track alone (RMS where it sounds, and peak)');
      for(const x of L)console.log(`  ${x.track.padEnd(14)} ${String(x.rms).padStart(6)} dB  peak ${String(x.peak).padStart(6)} dB`)}}

  else if(cmd==='info'){await open('film.html','en');console.log(JSON.stringify(await ev(`TRAILER.info(${+args[0]||1})`),null,1))}

  else if(cmd==='stills'||cmd==='video'){
    const langs=cmd==='video'?(args.length?args:['en','de']):[args[0]&&!args[0].includes('.')&&args[0].length===2?args.shift():'en'];
    const only=cmd==='stills'?args:[];
    if(cmd==='video'&&!fs.existsSync(path.join(out,'music.wav')))throw new Error('render the music first: node tools/trailer/trailer.mjs music');
    for(const lang of langs){await open('film.html',lang);flushLogs('load');
      const plan=await ev('TRAILER.plan()');
      if(plan.gaps.length){console.log('FAIL the shots do not follow one another without a gap at: '+plan.gaps.join(', '));code=1}
      // every line a shot speaks is a line of the game: it stands in a chapter's file or in the engine, as the game says it
      const src=[path.join(root,'index.html'),...fs.readdirSync(path.join(root,'levels')).map(f=>path.join(root,'levels',f))].map(f=>fs.readFileSync(f,'utf8')).join('\n');
      for(const l of await ev('TRAILER.lines()')){const q=[l.text,l.text.replace(/'/g,"\\'"),l.text.replace(/"/g,'\\"')];
        if(!q.some(x=>src.includes(x))){console.log(`FAIL ${l.shot}: "${l.text}" is not a line of the game`);code=1}}
      const order=plan.shots.map((s,i)=>i).sort((a,b)=>(plan.shots[b].first?1:0)-(plan.shots[a].first?1:0));
      const clips=[],sheet=[];const t0=Date.now();
      for(const i of order){const s=plan.shots[i];if(only.length&&!only.includes(s.id))continue;
        const f0=Math.round(s.at*plan.fps),f1=Math.round((s.at+s.len)*plan.fps),n=f1-f0;
        const miss=await ev(`TRAILER.prepare(${i})`);flushLogs(s.id);
        for(const m of miss){console.log(`FAIL ${s.id}: "${m}" has no translation into ${lang}`);code=1}
        await ev(`TRAILER.start(${i})`);
        let ff=null,clip=path.join(tmp,`clip-${String(i).padStart(2,'0')}.mp4`),done=null;
        if(cmd==='video'){ff=spawn(FFMPEG,['-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate',String(plan.fps),'-c:v','png','-i','-',
            '-c:v','libx264','-preset','medium','-crf','12','-pix_fmt','yuv420p','-r',String(plan.fps),clip],{stdio:['pipe','ignore','pipe']});
          let err='';ff.stderr.on('data',d=>err+=d);done=new Promise((res,rej)=>ff.on('close',c=>c?rej(new Error('ffmpeg: '+err)):res()))}
        const want=cmd==='stills'?new Set([0,Math.floor(n/2),n-1,...s.look.map(x=>Math.round(x*plan.fps))]):null;
        for(let f=0;f<n;f++){const p=await ev(`TRAILER.frame(${i},${(f0+f)/plan.fps})`);
          if(p){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x,y:p.y,button:'none'});
            if(p.click){await send('Input.dispatchMouseEvent',{type:'mousePressed',x:p.x,y:p.y,button:'left',clickCount:1});
              await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.x,y:p.y,button:'left',clickCount:1})}
            await ev(`TRAILER.cursor(${p.x},${p.y})`)}
          if(!want||want.has(f)){const png=await shot();if(ff){if(!ff.stdin.write(png))await new Promise(r=>ff.stdin.once('drain',r))}else sheet.push({id:s.id,f,png})}
          await ev(`__clock.step(${1000/plan.fps})`)}
        if(ff){ff.stdin.end();await done;clips[i]=clip}
        await ev(`TRAILER.end(${i})`);flushLogs(s.id);
        console.log(`  ${lang} ${s.id.padEnd(12)} ${s.at.toFixed(2).padStart(6)} s +${s.len.toFixed(2)} s, ${n} frames  (${((Date.now()-t0)/1000).toFixed(0)} s)`)}
      if(cmd==='stills'){const dir=path.join(out,'stills');fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
        for(const x of sheet)fs.writeFileSync(path.join(dir,`${lang}-${x.id}-${x.f}.png`),x.png);
        // one sheet: each shot's three frames in a row, at a third of their size
        const html=path.join(tmp,'sheet.html'),ids=[...new Set(sheet.map(x=>x.id))];
        fs.writeFileSync(html,'<!doctype html><style>body{margin:0;background:#333;color:#fff;font:14px sans-serif}div{display:flex;gap:4px;margin:4px}img{width:636px}</style>'+
          ids.map(id=>`<p style="margin:6px 4px 0">${id}</p><div>`+sheet.filter(x=>x.id===id).map(x=>`<img src="${pathToFileURL(path.join(dir,`${lang}-${x.id}-${x.f}.png`)).href}">`).join('')+'</div>').join(''));
        await send('Emulation.setDeviceMetricsOverride',{width:1920,height:Math.min(16000,ids.length*390+20),deviceScaleFactor:1,mobile:false});
        await send('Page.navigate',{url:pathToFileURL(html).href});await sleep(1500);
        fs.writeFileSync(path.join(out,`stills-${lang}.png`),await shot());
        await send('Emulation.setDeviceMetricsOverride',{width:W,height:H,deviceScaleFactor:1,mobile:false});
        console.log(`=== ${lang}: ${ids.length} shots -> ${path.relative(root,path.join(out,`stills-${lang}.png`))}`)}
      else{// join the clips in the order of the film, and lay the music under them
        const list=path.join(tmp,'clips.txt');fs.writeFileSync(list,plan.shots.map((s,i)=>`file '${clips[i]}'`).join('\n'));
        const file=path.join(out,`trailer-${lang}.mp4`),dur=plan.length;
        await run(FFMPEG,['-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',list,'-i',path.join(out,'music.wav'),
          '-map','0:v','-map','1:a','-c:v','libx264','-preset','slow','-crf','16','-pix_fmt','yuv420p','-tune','animation','-movflags','+faststart',
          '-c:a','aac','-b:a','256k','-af',`afade=t=out:st=${(dur-1.5).toFixed(2)}:d=1.5`,'-t',dur.toFixed(3),file]);
        console.log(`=== ${lang}: ${dur.toFixed(1)} s -> ${path.relative(root,file)} (${((Date.now()-t0)/1000).toFixed(0)} s)`)}}}
  else{console.log('unknown command: '+cmd);code=1}
}catch(e){console.log('ERR '+(e.stack||e));code=1}
finally{try{ws&&ws.close()}catch{}chrome.kill();setTimeout(()=>{try{fs.rmSync(tmp,{recursive:true,force:true})}catch{}process.exit(code)},300)}
