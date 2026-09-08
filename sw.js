const CACHE='kd-allplay-v76-11';
const A=['./','./index.html','./styles.css','./app.js','./config.js','./manifest.webmanifest','./kakao-thumbnail-v69.png','./assets/allplay-footer-logo.png','./assets/class-seating-map.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const req=e.request;
  const url=new URL(req.url);
  const isCore=req.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/app.js')||url.pathname.endsWith('/styles.css')||url.pathname.endsWith('/config.js');
  if(isCore){
    e.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res;}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
  }else{
    e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res;})));
  }
});
