// The playtest's check of the installable app (sw.js, shared/pwa.js): served over http, the game registers its service worker, links a
// manifest that Chrome accepts as installable, keeps every file for offline play, and starts again with the network off.
// Used by playtest.mjs, which runs it as the stop `pwa` (and saves the home-screen icon as pwa-icon.png).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const types={'.html':'text/html','.js':'text/javascript'};
export async function checkPwa({send,ev,sleep,root,out}){
  const log=[];let failed=false;const ok=(c,m)=>{log.push((c?'ok   ':'FAIL ')+m);if(!c)failed=true};
  // every file in shared/ is on the list the service worker keeps
  const listed=(fs.readFileSync(path.join(root,'shared/pwa.js'),'utf8').match(/const FILES=\[(.*?)\]/)||[])[1]||'';
  const onDisk=fs.readdirSync(path.join(root,'shared')).filter(f=>f.endsWith('.js')).map(f=>'shared/'+f);
  ok(onDisk.every(f=>listed.includes(`'${f}'`)),'every file in shared/ is in the offline list of shared/pwa.js: '+onDisk.join(' '));
  const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(root,p);
    fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});r.end(b)}})});
  await new Promise(r=>srv.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${srv.address().port}/`;
  try{
    await send('Network.enable');await send('Page.navigate',{url});
    let n=0;for(let i=0;i<60&&n<24;i++){await sleep(500);n=await ev("caches.open('paul-of-tarsus').then(c=>c.keys()).then(k=>k.length).catch(()=>0)")}
    ok(await ev("navigator.serviceWorker.getRegistration().then(r=>!!(r&&r.active))"),'the service worker is active');
    const m=await send('Page.getAppManifest');ok(!(m.result.errors||[]).length,'the manifest has no errors '+JSON.stringify(m.result.errors||[]));
    const inst=(await send('Page.getInstallabilityErrors')).result.installabilityErrors||[];ok(!inst.length,'Chrome finds the game installable '+JSON.stringify(inst));
    const want=await ev("SHARED.pwa.files(CHAP,LANGS,location.href).length");
    ok(n>=want,`the service worker keeps all ${want} files for offline play (${n} kept)`);
    const icon=await ev("document.querySelector('link[rel=apple-touch-icon]').href");
    ok(/^data:image\/png/.test(icon),'the home-screen icon is painted in code');
    if(icon)fs.writeFileSync(path.join(out,'pwa-icon.png'),Buffer.from(icon.split(',')[1],'base64'));
    await send('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:-1,uploadThroughput:-1});
    await send('Page.navigate',{url:url+'?lang=de'});await sleep(4000);
    ok(/TARSUS/.test(await ev("(document.querySelector('#overlay')||{}).textContent||''")),'with no network the game starts from what was kept, in German');
    await ev("document.querySelector('#overlay [data-ch=\"9\"]')&&document.querySelector('#overlay [data-ch=\"9\"]').click(),1");await sleep(3000);
    ok(await ev("!!(window.CHAP&&CHAP[9].ready)||CHAP[9].ready"),'with no network Chapter Nine loads');
  }finally{
    await send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
    await ev("navigator.serviceWorker.getRegistrations().then(r=>Promise.all(r.map(x=>x.unregister()))).then(()=>caches.keys()).then(k=>Promise.all(k.map(x=>caches.delete(x))))");
    srv.close()}
  return{log,failed}}
