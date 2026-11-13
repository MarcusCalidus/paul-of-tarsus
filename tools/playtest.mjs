#!/usr/bin/env node
// Headless playthrough test and screenshot tool (needs Node 22+ and Google Chrome).
//   node tools/playtest.mjs                 full playthrough, prints one line per check
//   node tools/playtest.mjs title street    stop at named points and save screenshots
// Screenshots go to tools/out/ (or $SHOTS). Set $CHROME to use another Chromium-based browser.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.join(here,'..');
const CHROME=process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out=process.env.SHOTS||path.join(here,'out'),PORT=9333;
const stops=process.argv.slice(2);if(!stops.length)stops.push('final');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'paul-playtest-'));
const game=fs.readFileSync(path.join(root,'index.html'),'utf8');
fs.writeFileSync(path.join(tmp,'test.html'),game.replace('</body>',fs.readFileSync(path.join(here,'playtest-harness.html'),'utf8')+'</body>'));
fs.mkdirSync(out,{recursive:true});
const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--mute-audio','--hide-scrollbars',`--remote-debugging-port=${PORT}`,
  `--user-data-dir=${path.join(tmp,'profile')}`,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function target(){for(let i=0;i<60;i++){try{const j=await(await fetch(`http://127.0.0.1:${PORT}/json`)).json();
  const p=j.find(t=>t.type==='page');if(p)return p.webSocketDebuggerUrl}catch{}await sleep(250)}throw new Error('Chrome did not start')}
let failed=false;
try{
  const ws=new WebSocket(await target());await new Promise(r=>ws.onopen=r);
  let id=0;const pend=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id)}};
  const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}))});
  const ev=async x=>(await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:960,height:651,deviceScaleFactor:1,mobile:false});
  for(const stop of stops){
    await send('Page.navigate',{url:`file://${path.join(tmp,'test.html')}?stop=${stop}`});
    let log='';for(let i=0;i<900;i++){await sleep(250);log=await ev("(document.querySelector('#tlog')||{}).textContent||''");if(/STOP|DONE|ERR|JSERR|REJ/.test(log))break}
    await sleep(1600);await ev("document.querySelector('#tlog').style.display='none'");await sleep(100);
    const shot=await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(path.join(out,`${stop}.png`),Buffer.from(shot.result.data,'base64'));
    console.log(`=== ${stop}\n${log}`);
    if(/FAIL|ERR|JSERR|REJ/.test(log)||!/STOP|DONE/.test(log))failed=true;
  }
  ws.close();
}finally{chrome.kill();fs.rmSync(tmp,{recursive:true,force:true})}
process.exit(failed?1:0);
