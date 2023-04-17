// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOYE5J_8jnMAAqUl0hgsCK_7M9ZP05OFk",
  authDomain: "react-pro-497e9.firebaseapp.com",
  projectId: "react-pro-497e9",
  storageBucket: "react-pro-497e9.appspot.com",
  messagingSenderId: "685155320150",
  appId: "1:685155320150:web:21048205fce0afd1c816f7",
  measurementId: "G-JV8QC7S1SM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
