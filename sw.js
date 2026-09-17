const CACHE_NAME = 'kd-allplay-v76-42';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './config.js?v=76.43',
  './app.js?v=76.43',
  './1-1.jpg','./1-2.jpg','./1-3.jpg','./1-4.jpg','./1-5.jpg','./1-6.jpg','./1-7.jpg','./2-8.jpg','./3-2.jpg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(CORE.map(url => cache.add(url)))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // HTML/JS/CSS/config: network first so deployments appear immediately.
  if (
    req.mode === 'navigate' ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/app.js') ||
    url.pathname.endsWith('/config.js') ||
    url.pathname.endsWith('/styles.css')
  ) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
