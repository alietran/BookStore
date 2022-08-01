// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQGIFm7aM6QEO98TWXhC4EMYr_wNqdp3Q",
  authDomain: "phone-auth-bc923.firebaseapp.com",
  projectId: "phone-auth-bc923",
  storageBucket: "phone-auth-bc923.appspot.com",
  messagingSenderId: "739853488140",
  appId: "1:739853488140:web:b2e6a175275d3dedaf9e29",
  measurementId: "G-57FPV5Z3PB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentication = getAuth(app)
