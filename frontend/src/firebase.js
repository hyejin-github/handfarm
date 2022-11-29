// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmaWdEw8vUHsBwbt-JEsTn9IJZbi89C5I",
    authDomain: "handfarm-f3155.firebaseapp.com",
    projectId: "handfarm-f3155",
    storageBucket: "handfarm-f3155.appspot.com",
    messagingSenderId: "706384152194",
    appId: "1:706384152194:web:903db9888611f57d51169b",
    measurementId: "G-5NSV1GGYNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var auth_obj = firebase.auth();
var storage_obj = firebase.storage();

export default firebase;
export const auth = auth_obj;
export const storage = storage_obj;
