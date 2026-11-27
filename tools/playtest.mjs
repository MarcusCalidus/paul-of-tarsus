#!/usr/bin/env node
// Headless playthrough test and screenshot tool (needs Node 22+ and Google Chrome).
//   node tools/playtest.mjs                 full playthrough, prints one line per check
//   node tools/playtest.mjs title street    stop at named points and save screenshots
//   node tools/playtest.mjs de:title         the same in another language (screenshot de-title.png); the full run plays every language
//   node tools/playtest.mjs titlescroll      the title of a returning player, its list open at the second journey (titlepart, titlelast: other parts open)
//   node tools/playtest.mjs logo de:logo     the title's logo enlarged, in each language: look for crosses and for letters run together
//   node tools/playtest.mjs pwa              the installable app: service worker, manifest, offline play (served over http; icon saved as pwa-icon.png)
//   node tools/playtest.mjs continue         the title screen of a returning player (the game is reloaded; its autosave must bring them back)
//   node tools/playtest.mjs lanesall         the lane map (shared/lanes.js) on Chapter Fourteen's Ephesus; lanes, lanes2, lanesfolk and lanesmap are its pictures
//   node tools/playtest.mjs phoneall         the phone layout, on a phone held sideways (phone, phonetitle, phonereturn, phonezoom, phonechoice, phoneclose, phonemenu ... are its pictures)
//   node tools/playtest.mjs shadows          cast & contact shadows across single-lamp, multi-lamp, pitch-dark and wall-crease rooms (saves cast-shadows and room sheets)
//   node tools/playtest.mjs tunes de:tunes   one bar of each chapter's tune (shared/tunes.js) held to the chapters' own scores, note for note (saves tunes-sheet)
//   node tools/playtest.mjs levels           the level of every chapter's music, one level from Chapter Three on, and the music under a beat (saves levels-sheet)
//   node tools/playtest.mjs map24 de:map24   the travel map's windows for the road to Rome and the letters (italy, appia, lycus, letters): map24-sheet.png and map24-zoom.png
//   node tools/playtest.mjs lookback de:lookback   the journeys of the look back (shared/lookback.js): every chapter once, no road crossing, no name across a line (saves lookback-maps.png)
//   node tools/playtest.mjs finale de:finale   the end of the game (shared/finale.js): the map of the letters, the roll, the look back, the closing screen, the finished code
//                                                 (pletters, plookback, pclosing, pabout and ptitlefin are its pictures)
//   node tools/playtest.mjs later de:later     the map of the places of Paul's later letters, after the morning of his release (plater is its picture;
//                                                 the morning itself is played by final25)
// It first checks the translations against the English text (tools/strings.mjs), and that every picture in docs/screenshots is listed
// with its stop in tools/screenshots.txt (tools/retake.mjs takes the pictures again from that list).
// Screenshots go to tools/out/ (or $SHOTS). Set $CHROME to use another Chromium-based browser.
// Each stop may run for up to ninety minutes (the whole game in one language, `all`, takes about forty), and the time each stop took is
// printed after what it said ("     all took 38 min 12 s"), so that the next estimate is measured.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {checkTexts} from './strings.mjs';
import {checkPwa} from './pwa.mjs';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.join(here,'..');
const CHROME=process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out=process.env.SHOTS||path.join(here,'out');
const langs=fs.readdirSync(path.join(root,'lang')).filter(l=>fs.statSync(path.join(root,'lang',l)).isDirectory()).sort();
const stops=process.argv.slice(2);if(!stops.length)stops.push('pwa','all','resume','treasures','lanesall','phoneall',...langs.flatMap(l=>[l+':all',l+':resume',l+':treasures',l+':lanesall',l+':phoneall']));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'paul-playtest-'));
const game=fs.readFileSync(path.join(root,'index.html'),'utf8');
// The copy runs from a temp folder, so a <base> points it back at the repository for the level files. Every page starts without a
// kept autosave (the browser profile outlives a stop), unless the address says keep=1: the test that reloads the game on purpose.
fs.writeFileSync(path.join(tmp,'test.html'),game.replace('<head>',`<head><base href="${pathToFileURL(root+path.sep).href}"><script>if(!/[?&]keep=1/.test(location.search))try{localStorage.removeItem('paul.save');localStorage.removeItem('paul.opts');localStorage.removeItem('paul.saves');localStorage.removeItem('paul.treasures')}catch(e){}</script>`)
  .replace('</body>',fs.readFileSync(path.join(here,'playtest-harness.html'),'utf8')+'</body>'));
fs.mkdirSync(out,{recursive:true});
// Port 0: Chrome picks a free port and writes it to DevToolsActivePort, so several runs can play side by side.
const prof=path.join(tmp,'profile');
const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--mute-audio','--hide-scrollbars','--remote-debugging-port=0',
  `--user-data-dir=${prof}`,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function target(){for(let i=0;i<60;i++){try{const port=fs.readFileSync(path.join(prof,'DevToolsActivePort'),'utf8').split('\n')[0].trim();
  const j=await(await fetch(`http://127.0.0.1:${port}/json`)).json();
  const p=j.find(t=>t.type==='page');if(p)return p.webSocketDebuggerUrl}catch{}await sleep(250)}throw new Error('Chrome did not start')}
let failed=false;
{const r=checkTexts();console.log('=== text\n'+r.out.join('\n'));if(r.failed)failed=true}
/* every picture in docs/screenshots is listed in tools/screenshots.txt with the stop that takes it, and nothing is listed that is not there */
{const listed=fs.readFileSync(path.join(here,'screenshots.txt'),'utf8').split('\n').filter(l=>l&&!l.startsWith('#')).map(l=>l.trim().split(/\s+/)[0]),
    have=fs.readdirSync(path.join(root,'docs','screenshots')).filter(f=>f.endsWith('.png')).map(f=>f.slice(0,-4)),a=have.filter(p=>!listed.includes(p)),b=listed.filter(p=>!have.includes(p));
  console.log('=== pictures\n'+(a.length||b.length?'FAIL ':'ok   ')+`each of the ${have.length} pictures in docs/screenshots has its stop in tools/screenshots.txt`+(a.length?'. NOT LISTED: '+a.join(', '):'')+(b.length?'. NO PICTURE: '+b.join(', '):''));
  if(a.length||b.length)failed=true}
try{
  const ws=new WebSocket(await target());await new Promise(r=>ws.onopen=r);
  let id=0;const pend=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id)}};
  const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});
  const ev=async x=>(await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:960,height:669,deviceScaleFactor:1,mobile:false});
  /* how long a stop took, on a line of its own after what it said (the line under "=== stop" stays the stop's own, which retake.mjs reads) */
  const took=(name,t0)=>{const s=Math.round((Date.now()-t0)/1000);console.log(`     ${name} took ${Math.floor(s/60)} min ${s%60} s`)};
  for(const name of stops){if(name==='pwa'){const t0=Date.now(),r=await checkPwa({send,ev,sleep,root,out});console.log('=== pwa\n'+r.log.join('\n'));took(name,t0);if(r.failed)failed=true;continue}
    const t0=Date.now(),[lang,stop]=name.includes(':')?name.split(':'):['en',name];
    /* the phone stops are seen on a phone: held sideways (852 by 393, as an iPhone of 2023 shows a page), or held upright, touched and with no mouse */
    const phone=/^phone/.test(stop),up=stop==='phoneportrait';
    await send('Emulation.setDeviceMetricsOverride',phone?{width:up?393:852,height:up?852:393,deviceScaleFactor:3,mobile:true,screenWidth:up?393:852,screenHeight:up?852:393}:{width:960,height:669,deviceScaleFactor:1,mobile:false});
    await send('Emulation.setTouchEmulationEnabled',{enabled:phone,maxTouchPoints:phone?5:1});
    await send('Emulation.setEmitTouchEventsForMouse',{enabled:phone});
    await send('Page.navigate',{url:`file://${path.join(tmp,'test.html')}?stop=${stop}&lang=${lang}${phone?'&emu=1':''}`});
    // the whole game takes a while (about forty minutes for `all`): wait up to ninety minutes for a run to say STOP or DONE
    let log='';for(let i=0;i<21600;i++){await sleep(250);log=await ev("(document.querySelector('#tlog')||{}).textContent||''");if(/STOP|DONE|ERR|JSERR|REJ/.test(log))break}
    await sleep(1600);await ev("document.querySelector('#tlog').style.display='none'");await sleep(100);
    const shot=await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(path.join(out,`${lang==='en'?'':lang+'-'}${stop}.png`),Buffer.from(shot.result.data,'base64'));
    /* a stop may hand over pictures of its own, at their own size (window.SHEETS: name -> PNG data URL): they are saved beside the screenshot */
    for(const[k,v]of Object.entries(JSON.parse(await ev("JSON.stringify(window.SHEETS||{})")||'{}')))fs.writeFileSync(path.join(out,k+'.png'),Buffer.from(v.split(',')[1],'base64'));
    console.log(`=== ${name}\n${log}`);took(name,t0);
    if(/FAIL|ERR|JSERR|REJ/.test(log)||!/STOP|DONE/.test(log))failed=true;
  }
  ws.close();
}finally{chrome.kill();await sleep(600);try{fs.rmSync(tmp,{recursive:true,force:true,maxRetries:6,retryDelay:300})}catch{}}
process.exit(failed?1:0);
