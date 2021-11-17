const staticCacheName = 'snake-game-v1.1.0';
const assets = [
"/snake-game/",
"/snake-game/index.html",
"/snake-game/assets/css/custom-right-click-menu.css",
"/snake-game/assets/css/style.css",

"/snake-game/assets/img/AV.svg",
"/snake-game/assets/img/portfolio.svg",
"/snake-game/assets/img/favicon.svg",
"/snake-game/assets/img/icons8-disney-now.svg",
"/snake-game/assets/img/icons8-github.svg",
"/snake-game/assets/img/icons8-instagram.svg",
"/snake-game/assets/img/icons8-linkedin.svg",
"/snake-game/assets/img/icons8-stack-overflow.svg",


"/snake-game/assets/js/mainFunction.js",
"/snake-game/assets/js/script.js",

"/snake-game/assets/music/food.mp3",
"/snake-game/assets/music/gameover.mp3",
"/snake-game/assets/music/move.mp3",
];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      return cache.addAll(assets)
      .catch(err =>{
        console.error('Error adding files to cache',err);
      })
    })
    )
  console.info('SW installed');
  self.skipWaiting();
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
        );
    })
    );
  return self.clients.claim();
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
    );
});
