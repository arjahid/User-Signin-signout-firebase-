// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZNTYq423SaBSAAK-WJMb46eOeKx8Ko8A",
  authDomain: "practice-69dbf.firebaseapp.com",
  projectId: "practice-69dbf",
  storageBucket: "practice-69dbf.firebasestorage.app",
  messagingSenderId: "826096043578",
  appId: "1:826096043578:web:1a7150870dfd6a87a59703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);