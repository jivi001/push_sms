// This file is intentionally blank.
// It is required for Firebase Cloud Messaging to work in the background.
// When the app is in the background, this service worker will handle incoming messages.
// You can add logic here to display notifications when the app is not in focus.

// For now, this boilerplate is sufficient to get started.
self.addEventListener('push', (event) => {
    // For now, we'll just log the push event.
    // In a real app, you would construct a notification here.
    console.log('[Firebase Messaging SW] Push Received.', event.data.text());
});
