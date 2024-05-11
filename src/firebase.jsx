// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyA_5yH65yQdmne621exPacr-Re_1ZinMjI",

  authDomain: "salama-mama.firebaseapp.com",

  projectId: "salama-mama",

  storageBucket: "salama-mama.appspot.com",

  messagingSenderId: "808011176101",

  appId: "1:808011176101:web:ccd00314abd2358fed954c",

  measurementId: "G-BZ92HJEBSW"

};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


