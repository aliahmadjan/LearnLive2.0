// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";







// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCosGzHPfLH2wZ5EI9tk7MyNS8QWK7NZk",
  authDomain: "learnlive-fb183.firebaseapp.com",
  projectId: "learnlive-fb183",
  storageBucket: "learnlive-fb183.appspot.com",
  messagingSenderId: "90715230846",
  appId: "1:90715230846:web:d1927b2555602e5acefe2f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const db1 = app.firestore();


// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log("Firebase app is connected.");
//   } else {
//     console.log("Firebase app is not connected.");
//   }
// });
// const auth = firebase.auth().currentUser;
// const provider = new firebase.auth.GoogleAuthProvider();
  
export { db , db1};