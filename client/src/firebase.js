import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-2f2e0.firebaseapp.com",
  projectId: "mern-blog-2f2e0",
  storageBucket: "mern-blog-2f2e0.appspot.com",
  messagingSenderId: "954301495755",
  appId: "1:954301495755:web:320137c3d51698106fde4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);