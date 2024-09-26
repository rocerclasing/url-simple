import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth} from "firebase/auth";
//para usarlo firestore




const firebaseConfig = {
  apiKey: "AIzaSyBJjZ-wopqTYZpHDwHzhHNELqS4Uycqvus",
  authDomain: "react-2024-c5628.firebaseapp.com",
  projectId: "react-2024-c5628",
  storageBucket: "react-2024-c5628.appspot.com",
  messagingSenderId: "40902981769",
  appId: "1:40902981769:web:a056bdd2810cbae735ee58",
  measurementId: "G-D9C2XP0721"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };