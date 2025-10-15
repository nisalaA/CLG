 const CACHE_NAME = 'stitch-design-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'logo.png',
  '0129(4).mp4',
  'https://fonts.googleapis.com/css2?display=swap&family=Playfair+Display:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700;900',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
