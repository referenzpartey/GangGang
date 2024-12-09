
const CACHE_NAME = 'location-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png',
    'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
