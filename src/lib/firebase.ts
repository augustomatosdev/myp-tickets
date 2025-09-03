import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcjRitJKI2ra53l4O_8EF01en1N2Ttf7Q",
  authDomain: "pagora-2854e.firebaseapp.com",
  projectId: "pagora-2854e",
  storageBucket: "pagora-2854e.firebasestorage.app",
  messagingSenderId: "97720430294",
  appId: "1:97720430294:web:72c623e0537f46e551a377",
  measurementId: "G-0EPLFNFG8P",
};

// Initialize Firebase

const app = getApps.length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.useDeviceLanguage(); // Use the device's language for authentication

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
