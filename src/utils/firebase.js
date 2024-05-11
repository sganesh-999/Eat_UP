// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_APPID, FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_MESSAGINGSENDERID, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET } 
from "./constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
