// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEn4ySXJ2BJ18vhw0zV_w8CmC8mneku14",
  authDomain: "multistore-taranto.firebaseapp.com",
  projectId: "multistore-taranto",
  storageBucket: "multistore-taranto.appspot.com",
  messagingSenderId: "425418979027",
  appId: "1:425418979027:web:30d7fa21e970076f0d8626",
  measurementId: "G-2QDRB6GPY1",
};

export const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider().setCustomParameters({
  prompt: "select_account",
});

const db = app.firestore();
export const storage = getStorage(app);
export default db;
