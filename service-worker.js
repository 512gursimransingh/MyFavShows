// const CACHE_NAME = 'hindi-movie-channels-yt-ui-v1';
// const urlsToCache = ['./','./index.html','./style.css','./script.js','./channels.json','./manifest.json'];

// self.addEventListener('install', e=>{
//   e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));
// });

// self.addEventListener('activate', e=>{
//   e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))));
// });

// self.addEventListener('fetch', e=>{
//   e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));

// });
