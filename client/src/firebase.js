// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: "clone-35f24.firebaseapp.com",
  projectId: "clone-35f24",
  storageBucket: "clone-35f24.appspot.com",
  messagingSenderId: "877740661096",
  appId: "1:877740661096:web:39d039b3a77ec5216f5edd",
  measurementId: "G-HZ0ZV9ZQSD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);