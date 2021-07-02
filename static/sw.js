let cacheName = 'LF_pwa_2021';
let filesToCache = [
    '/',
    '/static/img/image1.png',
    '/static/img/image2.png'
];
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(filesToCache);
    })
  );

  self.skipWaiting();
});


self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

//L'utilizzo di questa strategia significa che agli utenti verrà sempre fornita la versione più aggiornata dell'applicazione, ma se perdono la connessione di rete verranno invece forniti i dati memorizzati nella cache.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});


