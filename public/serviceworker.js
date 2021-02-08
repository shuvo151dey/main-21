//install serviceworker
self.addEventListener('install', event => console.log('ServiceWorker installed'));
//install listener for click on notification
self.addEventListener('notificationclick', event => {
    event.waitUntil(self.clients.matchAll().then(clients => {
        if (clients.length){
            //check if site is already open
            //if open just focus on the site
            clients[0].focus();
        } else {
            //if not open open a window
            self.clients.openWindow('/');
        }
    }));
});