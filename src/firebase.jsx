// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdXbpPG0WBalth0DBpAApdXYuKf7NE_NM",
  authDomain: "frontida-5d700.firebaseapp.com",
  projectId: "frontida-5d700",
  storageBucket: "frontida-5d700.appspot.com",
  messagingSenderId: "124891561863",
  appId: "1:124891561863:web:451a2f14a14f9161025d22"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


