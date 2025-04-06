// firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqLe_El7vs5aR4uyrHpJc8v0WOmab3t6w",
  authDomain: "devhouse-67383.firebaseapp.com",
  projectId: "devhouse-67383",
  storageBucket: "devhouse-67383.firebasestorage.app",
  messagingSenderId: "1035024562502",
  appId: "1:1035024562502:web:041fa5b227cb4f7a3bcd47",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
