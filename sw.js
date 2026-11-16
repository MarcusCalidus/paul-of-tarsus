/* Paul of Tarsus: the service worker that lets the game be installed and played without a connection.
   The page asks for it only when it is served over http(s) (see shared/pwa.js); opened from disk, the game never loads it.
   The network comes first, so that a player always gets the files of the newest version together and never a mixed set; a file
   that was fetched once, and every file that shared/pwa.js asks to be kept ahead of time, is the fallback when there is no network. */
const CACHE='paul-of-tarsus';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
const keep=(req,res)=>{if(res&&res.ok)return caches.open(CACHE).then(c=>c.put(req,res)).catch(()=>{})};
self.addEventListener('fetch',e=>{const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(fetch(r).then(res=>{e.waitUntil(keep(r,res.clone()));return res},
    // the title page may be asked for with a query (?lang=de): the same page answers
    ()=>caches.match(r,{ignoreSearch:true}).then(m=>m||Response.error())))});
/* the page lists the files to have ready for offline play */
self.addEventListener('message',e=>{const urls=e.data&&e.data.keep;if(!Array.isArray(urls))return;
  e.waitUntil(Promise.all(urls.map(u=>fetch(u).then(res=>keep(u,res),()=>{}))))});
