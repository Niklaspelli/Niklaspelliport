// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Denna rad fattas hos dig
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6i4bNh8ZFzubb9f89c2d1bauZ6Sa8AIQ",
  authDomain: "portfolio-db-3104f.firebaseapp.com",
  projectId: "portfolio-db-3104f",
  storageBucket: "portfolio-db-3104f.firebasestorage.app",
  messagingSenderId: "561757538253",
  appId: "1:561757538253:web:510a4f210ef3a006542684",
  measurementId: "G-7BM97QW3R4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Skapa och exportera databas-referensen
export const db = getFirestore(app);
