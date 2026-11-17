#!/usr/bin/env node
// Takes the pictures of docs/screenshots again (needs what the playtest needs: Node 22+ and Google Chrome).
//   node tools/retake.mjs                 every picture, in five runs of the playtest side by side
//   node tools/retake.mjs 3               the same in three runs
//   node tools/retake.mjs lydia jailer    only these pictures
// tools/screenshots.txt says which stop takes which picture. The stops are played into tools/out/retake/ and each picture is copied from
// there. A stop replays its chapter up to its place, so allow about a minute for each. A picture whose stop did not halt, or halted with
// a failing check, is left as it was and is named at the end. Look at every picture that changed before committing it.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.join(here,'..'),out=path.join(here,'out','retake'),shots=path.join(root,'docs','screenshots');
const rows=fs.readFileSync(path.join(here,'screenshots.txt'),'utf8').split('\n').filter(l=>l&&!l.startsWith('#')).map(l=>l.trim().split(/\s+/))
  .map(([pic,stop,file])=>({pic,stop,file:file||stop.replace(':','-')}));
const args=process.argv.slice(2),n=args.length&&/^\d+$/.test(args[0])?Math.max(1,+args.shift()):5,want=args.length?rows.filter(r=>args.includes(r.pic)):rows;
const unknown=args.filter(a=>!rows.some(r=>r.pic===a));if(unknown.length){console.error('no such picture in tools/screenshots.txt: '+unknown.join(', '));process.exit(1)}
const stops=[...new Set(want.map(r=>r.stop))],runs=Array.from({length:Math.min(n,stops.length)},(_,i)=>stops.filter((s,j)=>j%n===i));
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
console.log(`${want.length} pictures from ${stops.length} stops, in ${runs.length} run${runs.length>1?'s':''} side by side`);
await Promise.all(runs.map((list,i)=>new Promise(done=>{const log=fs.openSync(path.join(out,`run-${i}.log`),'w');
  spawn(process.execPath,[path.join(here,'playtest.mjs'),...list],{env:{...process.env,SHOTS:out},stdio:['ignore',log,log]}).on('exit',()=>{fs.closeSync(log);done()})})));
/* what each stop said: the playtest prints "=== stop" and then its lines */
const said={};for(let i=0;i<runs.length;i++)for(const part of fs.readFileSync(path.join(out,`run-${i}.log`),'utf8').split(/^=== /m).slice(1)){const k=part.slice(0,part.indexOf('\n'));said[k]=part}
const good=s=>{const t=said[s];return!!t&&!/^FAIL|JSERR|REJ |^ERR/m.test(t)&&(s==='pwa'||/^(STOP|DONE)/m.test(t))};
let placed=0,same=0;const left=[];
for(const r of want){const src=path.join(out,r.file+'.png'),dst=path.join(shots,r.pic+'.png');if(!good(r.stop)||!fs.existsSync(src)){left.push(`${r.pic} (stop ${r.stop})`);continue}
  if(fs.existsSync(dst)&&fs.readFileSync(dst).equals(fs.readFileSync(src)))same++;else{fs.copyFileSync(src,dst);placed++}}
console.log(`${placed} pictures placed in docs/screenshots, ${same} unchanged`+(left.length?`\nLEFT AS THEY WERE (see tools/out/retake/run-*.log): ${left.join(', ')}`:''));
process.exit(left.length?1:0);
