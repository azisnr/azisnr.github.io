var CACHE_NAME = 'end-games-web-cache-v1';
var urlsToCache = [
  '/',
  '/css/main.css',
  '/css/mains.css',
  '/css/util.css',
  '/js/main.js',
  '/js/jquery.min.js',
  '/wow.css',
  '/wow.js',
  '/serviceworker.js',
  'manifest.json',
  'fonts/poppins/Poppins-Bold.ttf',
  'fonts/poppins/Poppins-Regular.ttf',
  'fonts/poppins/Poppins-Medium.ttf',
  '/images/icons/icon-96x96.png',
  '/css/bootstrap.css'
];
self.addEventListener('install', function (event) {
  event.waitUntil(
      caches.open(CACHE_NAME).then(
          function (cache) {
              console.log('service worker do install..', cache);
              return cache.addAll(urlsToCache);
          },
          // function (err) {
          //     console.log('err : ' , err);
          // }
      )
  )
});

/* aktivasi cache */
self.addEventListener('activate', function (event) {
  event.waitUntil(
      caches.keys().then(function (cacheNames) {
          return Promise.all(
              // delete cache jika ada versi  lebih baru
              cacheNames.filter(function (cacheName) {
                  return cacheName !== CACHE_NAME;
              }).map(function (cacheName) {
                  return caches.delete(cacheName);
              })
          );
      })
  );
});

/* fetch cache */
self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request)
          .then(function (response) {
          console.log(response);
          if (response){
              return response;
          }
          return fetch(event.request);
      })
  )
});

self.addEventListener('notificationClose', function (n){
    var notification = n.notification;
    var primaryKey = notification.data.primaryKey;

    console.log('Close Notification : ' + primaryKey);
});


self.addEventListener('notificationclick', function (n){
    var notification = n.notification;
    var primaryKey = notification.data.primaryKey;
    var action = n.action;

    if(action === 'close'){
        notification.close();
    }else{
        clients.openWindow('https://www.marvel.com/movies/avengers-endgame');
        notification.close();
    }

});