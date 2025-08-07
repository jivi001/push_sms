// src/lib/firebase-config.ts
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID",
  measurementId: "REPLACE_WITH_YOUR_MEASUREMENT_ID"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const messaging = (async () => {
    try {
        if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
            const isSupported = await ('serviceWorker' in navigator && 'PushManager' in window);
            if(isSupported) {
                const messagingInstance = getMessaging(app);
                // Handle foreground messages
                onMessage(messagingInstance, (payload) => {
                    console.log('Foreground message received.', payload);
                    // You can display a custom notification/UI here
                });
                return messagingInstance;
            }
        }
    } catch (err) {
        console.error('Failed to initialize messaging:', err);
    }
    return null;
})();


export const requestFcmToken = async () => {
    const messagingInstance = await messaging;
    if (!messagingInstance) {
        console.log("Messaging is not supported in this browser.");
        return null;
    }
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const currentToken = await getToken(messagingInstance, { vapidKey: 'REPLACE_WITH_YOUR_VAPID_KEY' });
            if (currentToken) {
                return currentToken;
            } else {
                console.log('No registration token available. Request permission to generate one.');
                return null;
            }
        } else {
            console.log('Unable to get permission to notify.');
            return null;
        }
    } catch (err) {
        console.error('An error occurred while retrieving token. ', err);
        return null;
    }
};

export { app as firebaseApp, messaging };
