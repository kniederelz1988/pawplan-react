// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeAt7M84IJkMxBHGQncZ2_CDROezzqsMA",
  authDomain: "syn-kn-pawplan.firebaseapp.com",
  projectId: "syn-kn-pawplan",
  storageBucket: "syn-kn-pawplan.firebasestorage.app",
  messagingSenderId: "270992856037",
  appId: "1:270992856037:web:e906d85fac9ab40dda150c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;