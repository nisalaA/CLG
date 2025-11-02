const STATIC_CACHE_NAME = 'clg-static-cache-v2';
const DYNAMIC_CACHE_NAME = 'clg-dynamic-cache-v2';

// Assets to pre-cache on installation
const assetsToCache = [
    '/',
    'index.html',
    'aboutus.html',
    'contactus.html',
    'style.css',
    'script.js',
    'logo.png',
    'dhanu.jpeg',
    'gem.jpg',
    'gems2.webp',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Install service worker and pre-cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(cache => {
            console.log('Pre-caching static assets');
            return cache.addAll(assetsToCache);
        })
    );
    self.skipWaiting(); // Activate new service worker immediately
});

// Activate service worker and clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
    return self.clients.claim();
});

// Fetch event handler with caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // For HTML pages, use a Network First strategy to get the latest content
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
            .then(response => {
                // Clone the response and cache it for offline use
                const responseToCache = response.clone();
                caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                    cache.put(request, responseToCache);
                });
                return response;
            })
            .catch(() => caches.match(request)) // Fallback to cache if network fails
        );
        return;
    }

    // For other assets (CSS, JS, images), use Stale-While-Revalidate
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            const networkFetch = fetch(request).then(networkResponse => {
                const responseToCache = networkResponse.clone();
                caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                    cache.put(request, responseToCache);
                });
                return networkResponse;
            }).catch(() => console.warn('Fetch failed, serving from cache if available.'));

            // Return from cache immediately, then update the cache in the background.
            return cachedResponse || networkFetch;
        })
    );
});
