import { useSoundContext } from "../src/context/SoundContext";

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAH0J7BtGKf3IkHsU8Pg5tFScfOwGzp3Z0",
  authDomain: "famto-aa73e.firebaseapp.com",
  projectId: "famto-aa73e",
  storageBucket: "famto-aa73e.appspot.com",
  messagingSenderId: "773492185977",
  appId: "1:773492185977:web:e425f759d3c13e8c2c2da8",
  measurementId: "G-TZ0J50H36P",
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

  if (payload.notification.title === "New Order" || payload.notification.title === "Order Rejected") {
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
