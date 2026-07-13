const CACHE = "orchard-defense-sprint1-v1";
const APP_SHELL = [
  "./", "./index.html", "./style.css", "./manifest.webmanifest",
  "./src/app.js", "./src/core/GameState.js", "./src/board/Grid.js",
  "./src/entities/Plant.js", "./src/entities/Enemy.js",
  "./src/systems/Factory.js", "./src/ui/HUD.js",
  "./data/heroes.json", "./data/enemies.json", "./data/waves.json"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request)));
});
