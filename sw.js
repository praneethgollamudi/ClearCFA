self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  self.registration.showNotification(data.title || 'ClearCFA', {
    body: data.body || 'Time to study!',
    icon: '/ClearCFA/icon-192.png',
    badge: '/ClearCFA/icon-192.png',
    tag: 'clearcfa-reminder',
    data: { url: '/ClearCFA/' }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/ClearCFA/'));
});
