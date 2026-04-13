self.addEventListener("install", e => {
  console.log("Service Worker Installed");

  e.waitUntil(
    caches.open("app-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./app.js",
        "./icon-192.png",
        "./icon-512.png"
      ]);
    })
  );
});