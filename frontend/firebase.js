// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "food-delivery-web-app-df258.firebaseapp.com",
    projectId: "food-delivery-web-app-df258",
    storageBucket: "food-delivery-web-app-df258.firebasestorage.app",
    messagingSenderId: "84653038305",
    appId: "1:84653038305:web:03dcf0e558d474a01135a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }