import firebase from 'firebase/app';
import 'firebase/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebase
//
//const analytics = getAnalytics(app);
  //databaseURL: "https://iscf-lab1-2cd64-default-rtdb.europe-west1.firebasedatabase.app",

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNAGevLlI63ieRUr_WuhKSLxL9yLYCbF0",
  authDomain: "iscf-lab1-2cd64.firebaseapp.com",
  databaseURL: "https://iscf-tp1-91e63-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iscf-lab1-2cd64",
  storageBucket: "iscf-lab1-2cd64.appspot.com",
  messagingSenderId: "686801500418",
  appId: "1:686801500418:web:8df220ff7bf82c0526aa1b",
  measurementId: "G-SCDT7Y52VF"
};

//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export default app;//firebase.database();