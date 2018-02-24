//This is the service worker with the Cache-first network

var CACHE = 'kousheralam-precache-2';
var precacheFiles = [
      '/js/app.js',
      'img/author.jpg',
      '/css/main.css',
      '/img/apple-icon-57x57.png',
      '/img/apple-icon-60x60.png',
      '/img/apple-icon-72x72.png',
      '/img/apple-icon-76x76.png',
      '/img/apple-icon-114x114.png',
      '/img/apple-icon-120x120.png',
      '/img/apple-icon-144x144.png',
      '/img/apple-icon-152x152.png',
      '/img/apple-icon-180x180.png',
      '/img/android-icon-192x192.png',
      '/img/favicon-32x32.png',
      '/img/favicon-96x96.png',
      '/img/favicon-16x16.png',
      '/img/ms-icon-144x144.png',
      '/img/android-icon-36x36.png',
      '/img/android-icon-48x48.png',
      '/img/android-icon-72x72.png',
      '/img/android-icon-96x96.png',
      '/img/android-icon-144x144.png',
      '/img/android-icon-192x192.png',
      '/img/ms-icon-70x70.png',
      '/img/ms-icon-150x150.png',
      '/img/ms-icon-310x310.png',
      '/css/fonts/roboto-slab-v7-latin-300.eot',
      '/css/fonts/roboto-slab-v7-latin-300.svg',
      '/css/fonts/roboto-slab-v7-latin-300.ttf',
      '/css/fonts/roboto-slab-v7-latin-300.woff',
      '/css/fonts/roboto-slab-v7-latin-300.woff2',
      '/css/fonts/roboto-slab-v7-latin-700.eot',
      '/css/fonts/roboto-slab-v7-latin-700.svg',
      '/css/fonts/roboto-slab-v7-latin-700.ttf',
      '/css/fonts/roboto-slab-v7-latin-700.woff',
      '/css/fonts/roboto-slab-v7-latin-700.woff2',
      '/css/fonts/roboto-slab-v7-latin-regular.eot',
      '/css/fonts/roboto-slab-v7-latin-regular.svg',
      '/css/fonts/roboto-slab-v7-latin-regular.ttf',
      '/css/fonts/roboto-slab-v7-latin-regular.woff',
      '/css/fonts/roboto-slab-v7-latin-regular.woff2',
      '/kousher_cv.pdf'
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[ServiceWorker] Skip waiting on install');
      return self.skipWaiting();

  })
  );
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
console.log('[ServiceWorker] Claiming clients for current page');
      return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}


function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cahche to go to the server and get it
return fetch(request).then(function(response){ return response})
}

//This is the "Offline copy of pages" wervice worker

//Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function(event) {
  var indexPage = new Request('index.html');
  event.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        console.log('[PWA Builder] Cached index page during Install'+ response.url);
        return cache.put(indexPage, response);
      });
  }));
});

//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('[PWA Builder] add page to offline'+response.url)
        return cache.put(request, response);
      });
    });
  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );

      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})

