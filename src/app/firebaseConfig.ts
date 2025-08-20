import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY4-1xuaY4P1nKgFiqCtf8MLgylOySwv0",
  authDomain: "project-5-3d49f.firebaseapp.com",
  databaseURL: "https://project-5-3d49f-default-rtdb.firebaseio.com",
  projectId: "project-5-3d49f",
  storageBucket: "project-5-3d49f.firebasestorage.app",
  messagingSenderId: "249891078939",
  appId: "1:249891078939:web:4dc8a0b424658102ae09be",
  measurementId: "G-9RQCZH3YN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbFirebase = getDatabase(app);
export const authFirebase = getAuth(app)