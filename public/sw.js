// Minimal Service Worker for PWA
// This version avoids caching to prevent broken builds and stale content issues.

self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
  event.waitUntil(self.clients.claim());
});



