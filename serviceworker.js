const cacheName = 'v.1.0.0'; 
const precacheResources = [
    '/',
    "index.html",
    "favicon.ico",
    "main.js",
    "style.css",
    "https://code.jquery.com/jquery-3.7.1.min.js"
];

self.addEventListener('install', event => {
    // console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', function (event) {
    var cacheAllowlist = [cacheName];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // console.log('Fetch intercepted for:', event.request.url);
    // dont try to match resource from certain domain
    // if (event.request.url.indexOf('rex.com') > 1) return;
    
    event.respondWith(caches.match(event.request) 
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});