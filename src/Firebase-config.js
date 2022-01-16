// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAgO39yBjVYePXv2kzpB5mlqC3Ozi05Kyk",
  authDomain: "webshop-150.firebaseapp.com",
  projectId: "webshop-150",
  storageBucket: "webshop-150.appspot.com",
  messagingSenderId: "194441139132",
  appId: "1:194441139132:web:227dbc5c6e9ffec463d1b9",
  measurementId: "G-6NBLM6JFJK",
};
/*
const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require("firebase/app-check");

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('abcdefghijklmnopqrstuvwxy-1234567890abcd'),
});
*/

/*
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAgO39yBjVYePXv2kzpB5mlqC3Ozi05Kyk",
  authDomain: "webshop-150.firebaseapp.com",
  projectId: "webshop-150",
});
*/

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
