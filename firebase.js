// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQn8rYGzC8zzKnhogKU-Zbq0yn14zB9LA",
  authDomain: "resume-builder-d12b6.firebaseapp.com",
  projectId: "resume-builder-d12b6",
  storageBucket: "resume-builder-d12b6.appspot.com",
  messagingSenderId: "1050606006880",
  appId: "1:1050606006880:web:813c5f6503561cbf310905"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage();
const db = getFirestore();
export { app, db, storage };
