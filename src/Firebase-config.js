import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //  Apis from firebase
  apiKey: "AIzaSyDuG37GIoGHQJ2lgpLjhXT2x_IHI7IBs4k",
  authDomain: "chatting-app-2a74a.firebaseapp.com",
  projectId: "chatting-app-2a74a",
  storageBucket: "chatting-app-2a74a.appspot.com",
  messagingSenderId: "55972166601",
  appId: "1:55972166601:web:f13b3ed2cd9217f70d8618",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
