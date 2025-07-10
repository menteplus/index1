// service-worker.js

const CACHE_NAME = 'calculadoras-enfermagem-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/header.js',
    '/main.js',
    '/manifest.json',
    '/favicon.ico',
    // Add other assets like images, CSS, fonts if they are static and should be cached
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Inter:wght@400;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    'https://cdn.jsdelivr.net/gh/antijingoist/opendyslexic/web/opendyslexic.css',
    'https://vlibras.gov.br/app/vlibras-plugin.js'
    // 'https://www.calculadorasdeenfermagem.com.br/assets/logo.svg', // Example if you have local assets
    // 'https://www.calculadorasdeenfermagem.com.br/assets/imagem-compartilhamento.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // No cache hit - fetch from network
                return fetch(event.request).catch(() => {
                    // If network fails, you could return an offline page
                    // return caches.match('/offline.html');
                });
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
