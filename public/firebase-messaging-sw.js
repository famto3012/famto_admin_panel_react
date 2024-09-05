import { useSoundContext } from "../src/context/SoundContext";

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { playNewOrderNotificationSound, playNewNotificationSound } =
    useSoundContext();
  //console.log("Received background message ", payload);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) =>
      client.postMessage({
        type: "NOTIFICATION_RECEIVED",
        payload: payload,
      })
    );
  });

  if (payload.notification.title === "New Order") {
    console.log("Background Sound");
    playNewOrderNotificationSound();
  } else {
    console.log("Background Sound");
    playNewNotificationSound();
  }
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
