import firebase from "firebase/app";
import "firebase/firestore";
import { API_KEY, APP_ID } from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "handicrawl.firebaseapp.com",
  databaseURL:
    "https://handicrawl-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "handicrawl",
  storageBucket: "handicrawl.appspot.com",
  messagingSenderId: "600608599441",
  appId: APP_ID,
  measurementId: "G-1DXE8MV8EG",
};

firebase.initializeApp(firebaseConfig);

const dbh = firebase.firestore();

export default dbh;
