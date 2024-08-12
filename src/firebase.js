import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, onMessage } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAH0J7BtGKf3IkHsU8Pg5tFScfOwGzp3Z0",
  authDomain: "famto-aa73e.firebaseapp.com",
  projectId: "famto-aa73e",
  storageBucket: "famto-aa73e.appspot.com",
  messagingSenderId: "773492185977",
  appId: "1:773492185977:web:e425f759d3c13e8c2c2da8",
  measurementId: "G-TZ0J50H36P",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Subscribe to incoming messages
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  // Handle notification display or other actions based on payload
  const { title, body } = payload.notification;
  // Example: Display notification using browser's native notification API
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
});

export { messaging, storage, auth };
