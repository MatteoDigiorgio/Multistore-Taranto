// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEn4ySXJ2BJ18vhw0zV_w8CmC8mneku14",
  authDomain: "multistore-taranto.firebaseapp.com",
  projectId: "multistore-taranto",
  storageBucket: "multistore-taranto.appspot.com",
  messagingSenderId: "425418979027",
  appId: "1:425418979027:web:30d7fa21e970076f0d8626",
  measurementId: "G-2QDRB6GPY1",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export const storage = getStorage(app);
export default db;
