// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQ2fvzyO9i1yFFCIei1I8q0lzOy4dkM-0",
    authDomain: "to-do-app-1fe9.firebaseapp.com",
    projectId: "to-do-app-1fe9",
    storageBucket: "to-do-app-1fe9.appspot.com",
    messagingSenderId: "650852844997",
    appId: "1:650852844997:web:5abff8e38b5f835c7837ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}