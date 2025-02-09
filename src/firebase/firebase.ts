// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuGPlDD7gIul5uEBmjreGJaTbA_PMxCvI",
  authDomain: "questnote-43ea3.firebaseapp.com",
  projectId: "questnote-43ea3",
  storageBucket: "questnote-43ea3.firebasestorage.app",
  messagingSenderId: "277038739212",
  appId: "1:277038739212:web:2d1a5f9661330f3c1fa329",
  measurementId: "G-X9E4Q0H0GY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Export Firebase Auth
// export const auth = getAuth(app);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Firestore export


export {app, auth, db};