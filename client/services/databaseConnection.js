import firebase from 'firebase/app';
import 'firebase/firestore';
import admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: "AIzaSyBwFk0rmjv0JHcUzWtXV_ZpnoYQDR7MVTU",
  authDomain: "handicrawl.firebaseapp.com",
  databaseURL: "https://handicrawl-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "handicrawl",
  storageBucket: "handicrawl.appspot.com",
  messagingSenderId: "600608599441",
  appId: "1:600608599441:web:c2fd37eb5aa4ae4c66fe30",
  measurementId: "G-1DXE8MV8EG"
};

firebase.initializeApp(firebaseConfig);

const dbh = admin.firestore();


export default dbh;