const CACHE_NAME = "app-cache-v2"; // 🔹 Atualiza este nome ao modificar o cache
const OFFLINE_PAGE = "/offline.html"; // 🔹 Página offline

// 🔹 Recursos a serem cacheados para navegação offline
const CACHE_ASSETS = [
  "/",
  OFFLINE_PAGE,
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// ✅ Instalação do Service Worker
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalado.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Geração de cache de recursos...");
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// ✅ Ativação do SW e remoção de caches antigos
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Ativado.");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Removendo cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// ✅ Intercepta todas as requisições
self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Interceptando:", event.request.url);

  // 🔹 Se for uma navegação, tenta carregar da rede primeiro
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_PAGE))
    );
    return;
  }

  // 🔹 Para outros pedidos, tenta o cache primeiro
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// ✅ Atualização automática do SW
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("[Service Worker] Atualização automática ativada.");
    self.skipWaiting();
  }
});