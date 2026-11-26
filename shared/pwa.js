/* Paul of Tarsus: installing the game as an app, and playing it offline. Loaded by the page only when it is served over http(s),
   never from disk. Like everything else it is made in code: there is no icon file and no manifest file. The icon is the P of the
   title logo (shared/logo.js) painted onto a night sky, and the manifest is built here and handed to the browser as a blob.

     install({CHAP, LANGS})   registers sw.js, links the manifest and the home-screen icon, and has the service worker keep every file
                              of the game for offline play. FILES lists the shared files: a new file in shared/ is added to it
                              (the playtest checks this). */
SHARED.pwa=(()=>{
"use strict";
const FILES=['shared/beasts.js','shared/beat.js','shared/birds.js','shared/caesarea.js','shared/cast.js','shared/coast.js','shared/country.js','shared/crowd.js','shared/damascus.js','shared/lanes.js','shared/logo.js','shared/lookback.js','shared/map.js','shared/materials.js','shared/pwa.js','shared/scroll.js','shared/ship.js','shared/splash.js','shared/tablets.js','shared/temple.js','shared/tunes.js','shared/weather.js'];
const SKY=['#2c1c3e','#161026','#0b0812'];
/* the icon at a size in pixels: a gold P on a night sky. pad is the margin all round, as a part of the size; the 'maskable' icon is
   given a wide one, because a phone may cut it to a circle or a rounded square. */
function icon(size,pad){
  const c=document.createElement('canvas');c.width=c.height=size;const g=c.getContext('2d'),sky=g.createLinearGradient(0,0,0,size);
  SKY.forEach((col,i)=>sky.addColorStop(i/(SKY.length-1),col));g.fillStyle=sky;g.fillRect(0,0,size,size);
  const p=SHARED.logo.paint('P',' '),pg=p.getContext('2d'),d=pg.getImageData(0,0,p.width,p.height).data;
  let x0=p.width,y0=p.height,x1=0,y1=0;
  for(let y=0,i=3;y<p.height;y++)for(let x=0;x<p.width;x++,i+=4)if(d[i]>200){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
  const w=x1-x0+1,h=y1-y0+1,k=Math.min(size*(1-2*pad)/w,size*(1-2*pad)/h);
  g.imageSmoothingEnabled=false;g.drawImage(p,x0,y0,w,h,Math.round((size-w*k)/2),Math.round((size-h*k)/2),Math.round(w*k),Math.round(h*k));
  return c.toDataURL('image/png')}
/* every file the game may ask for, for the service worker to keep: the page, the chapters, the shared files, each language's files */
function files(CHAP,LANGS,base){const u=[base,'levels/prologue.js'];
  Object.keys(CHAP).forEach(n=>u.push(CHAP[n].src));u.push(...FILES);
  Object.keys(LANGS).forEach(l=>{const d=LANGS[l].dir;if(d)u.push(d+'main.js',d+'prologue.js',...Object.keys(CHAP).map(n=>d+'chapter'+n+'.js'))});
  return u}
async function install({CHAP,LANGS}){
  const base=new URL('./',location.href).href,abs=u=>new URL(u,base).href;
  const manifest={name:'Paul of Tarsus: On the Roads of Rome',short_name:'Paul of Tarsus',id:base,start_url:base,scope:base,display:'standalone',
    background_color:'#0b0812',theme_color:'#1c130c',categories:['games'],
    icons:[{src:icon(192,.14),sizes:'192x192',type:'image/png',purpose:'any'},{src:icon(512,.14),sizes:'512x512',type:'image/png',purpose:'any'},
      {src:icon(512,.26),sizes:'512x512',type:'image/png',purpose:'maskable'}]};
  const link=(rel,href)=>{let l=document.querySelector(`link[rel="${rel}"]`);if(!l){l=document.createElement('link');l.rel=rel;document.head.appendChild(l)}l.href=href};
  link('manifest',URL.createObjectURL(new Blob([JSON.stringify(manifest)],{type:'application/manifest+json'})));
  link('apple-touch-icon',icon(180,.14));
  await navigator.serviceWorker.register(abs('sw.js'),{scope:base});
  const reg=await navigator.serviceWorker.ready;
  /* a little later, so that the first screen is not kept waiting; not on a connection that asks to save data */
  const c=navigator.connection;if(c&&c.saveData)return;
  setTimeout(()=>reg.active&&reg.active.postMessage({keep:files(CHAP,LANGS,base).map(abs)}),4000)}
return{install,icon,files}})();
