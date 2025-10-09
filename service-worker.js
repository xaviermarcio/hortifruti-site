self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("hortifruti-cache-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/css/custom.css",
        "/assets/images/logo.png",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
