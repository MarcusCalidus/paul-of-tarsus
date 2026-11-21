#!/usr/bin/env node
// The trailer of Paul of Tarsus, made from the game itself (needs Node 22+, Google Chrome and ffmpeg).
//   node tools/trailer/trailer.mjs music [A B C]     render the drafts of the score to tools/trailer/out/music-X.wav, with their shape
//   node tools/trailer/trailer.mjs levels [A B C]    the level of each track of a draft on its own, to check the balance
// The game runs in headless Chrome from a copy of index.html whose <base> points back at the repository, as in tools/playtest.mjs;
// the music is rendered offline there (tools/trailer/music.js). What it writes goes to tools/trailer/out/ (or $TRAILER_OUT), which
// is not committed.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.join(here,'..','..');
const CHROME=process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out=process.env.TRAILER_OUT||path.join(here,'out');
const [cmd='music',...args]=process.argv.slice(2);
fs.mkdirSync(out,{recursive:true});
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'paul-trailer-'));
const game=fs.readFileSync(path.join(root,'index.html'),'utf8');
fs.writeFileSync(path.join(tmp,'trailer.html'),game.replace('<head>',`<head><base href="${pathToFileURL(root+path.sep).href}">`)
  .replace('</body>','<script src="tools/trailer/music.js"></script><script src="tools/trailer/drafts.js"></script></body>'));
const prof=path.join(tmp,'profile');
const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--mute-audio','--hide-scrollbars','--remote-debugging-port=0',
  `--user-data-dir=${prof}`,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function target(){for(let i=0;i<60;i++){try{const port=fs.readFileSync(path.join(prof,'DevToolsActivePort'),'utf8').split('\n')[0].trim();
  const j=await(await fetch(`http://127.0.0.1:${port}/json`)).json();const p=j.find(t=>t.type==='page');if(p)return p.webSocketDebuggerUrl}catch{}await sleep(250)}
  throw new Error('Chrome did not start')}
let code=0;
try{
  const ws=new WebSocket(await target());await new Promise(r=>ws.onopen=r);
  let id=0;const pend=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id)}};
  const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});
  const ev=async x=>{const r=await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true});
    if(r.result?.exceptionDetails)throw new Error(r.result.exceptionDetails.exception?.description||r.result.exceptionDetails.text);return r.result?.result?.value};
  await send('Page.enable');await send('Runtime.enable');
  await send('Page.navigate',{url:pathToFileURL(path.join(tmp,'trailer.html')).href});
  for(let i=0;i<80&&!await ev("typeof TR!=='undefined'&&!!TR.SCORES.A");i++)await sleep(250);
  // every pattern string must cover the bars of its score: a missing or extra character moves everything after it
  const bad=await ev(`(()=>{const bad=[];for(const k in TR.SCORES){const sc=TR.SCORES[k];for(const tr of sc.tracks){
    if(tr.prog){const n=tr.prog.replace(/\\s/g,'').length;if(n!==sc.bars)bad.push(k+' '+tr.name+': prog has '+n+' bars, not '+sc.bars)}
    for(const b in tr.lines||{})if(+b>=sc.bars)bad.push(k+' '+tr.name+': a note in bar '+b+', past the end');}}return bad})()`);
  if(bad.length){console.log(bad.map(b=>'FAIL '+b).join('\n'));code=1}
  const names=args.length?args:await ev('Object.keys(TR.SCORES)');
  if(cmd==='music')for(const k of names){const t0=Date.now();
    const r=await ev(`TR.wav(TR.SCORES[${JSON.stringify(k)}])`),PART=4<<20;let b64='';
    for(let i=0;i*PART<r.size;i++)b64+=await ev(`TR.part(${i},${PART})`);
    const file=path.join(out,`music-${k}.wav`);fs.writeFileSync(file,Buffer.from(b64,'base64'));
    const sc=await ev(`(s=>({title:s.title,dt:s.dt,bars:s.bars,sections:s.sections}))(TR.SCORES[${JSON.stringify(k)}])`);
    fs.writeFileSync(path.join(out,`music-${k}.json`),JSON.stringify({...sc,seconds:r.seconds,barLevels:r.bars,start:.25},null,1));
    console.log(`=== ${k}. ${sc.title}: ${r.seconds} s, peak before evening out ${r.peak} dBFS, rendered in ${((Date.now()-t0)/1000).toFixed(1)} s -> ${path.relative(root,file)}`);
    const secs=new Map(sc.sections.map(([b,s])=>[b,s]));
    console.log(r.bars.map((l,i)=>`  bar ${String(i).padStart(2)} ${(i*16*sc.dt).toFixed(1).padStart(5)} s ${String(l).padStart(6)} dB ${'#'.repeat(Math.max(0,Math.round((l+60)/1.5)))}${secs.has(i)?'  <- '+secs.get(i):''}`).join('\n'))}
  else if(cmd==='levels')for(const k of names){const L=await ev(`TR.levels(TR.SCORES[${JSON.stringify(k)}])`);
    console.log(`=== ${k}: each track alone (RMS where it sounds, and peak)`);
    for(const x of L)console.log(`  ${x.track.padEnd(14)} ${String(x.rms).padStart(6)} dB  peak ${String(x.peak).padStart(6)} dB`)}
  else{console.log('unknown command: '+cmd);code=1}
  ws.close();
}catch(e){console.log('ERR '+(e.stack||e));code=1}
finally{chrome.kill();setTimeout(()=>{try{fs.rmSync(tmp,{recursive:true,force:true})}catch{}process.exit(code)},300)}
