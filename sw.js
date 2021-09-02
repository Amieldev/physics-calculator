var staticCacheName="physics-calculator-v1.1";
var staticCacheFiles=[
    "https://physics-calculate.web.app/",
    "index.html",
    "offline.html"

]

self.addEventListener("install",e=>{
    e.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            return cache.addAll(staticCacheFiles);
        })
    )
});


self.addEventListener("activate",e=>{
    e.waitUntil(
        caches.keys().then(keys=>{
            return Promise.all(keys
             .filter(key=>key!==staticCacheName)
             .map(key=>caches.delete(key)) 
            )
        })
    )
    self.skipWaiting();
})


self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
})