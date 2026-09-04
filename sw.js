const CACHE='kd-allplay-v89';
const CORE=['./','./index.html','./styles.css','./app.js','./config.js','./manifest.webmanifest','./kakao-thumbnail-v69.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;

  // HTML/JS/CSS: always try the newest GitHub Pages file first.
  if(req.mode==='navigate' || /\.(?:js|css|html)$/.test(url.pathname)){
    event.respondWith(
      fetch(req,{cache:'no-store'}).then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy));
        return res;
      }).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html')))
    );
    return;
  }

  // Images/manifest: cache-first is fine.
  event.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{
    const copy=res.clone();
    caches.open(CACHE).then(c=>c.put(req,copy));
    return res;
  })));
});
