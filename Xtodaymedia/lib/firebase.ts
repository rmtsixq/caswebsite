import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBujRcE0V1PtE65fFaZ6FO4O_PRdIz7_N0",
  authDomain: "bensende-e7507.firebaseapp.com",
  databaseURL: "https://bensende-e7507-default-rtdb.firebaseio.com",
  projectId: "bensende-e7507",
  storageBucket: "bensende-e7507.firebasestorage.app",
  messagingSenderId: "935368276799",
  appId: "1:935368276799:web:dbd0280301acdd2ddcb18a",
  measurementId: "G-5FE73R5JZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;