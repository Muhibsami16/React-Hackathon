// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  addDoc,collection, serverTimestamp,getDocs,query,where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyD1sDYfWw2wQT-_zoLH1U0Jr2JdSjbWta0",
  authDomain: "hackathon-react-386bb.firebaseapp.com",
  projectId: "hackathon-react-386bb",
  storageBucket: "hackathon-react-386bb.firebasestorage.app",
  messagingSenderId: "367526683416",
  appId: "1:367526683416:web:2c67dca70443c70c2fb46d",
  measurementId: "G-T0W25791HK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth,db, addDoc,collection, serverTimestamp,getDocs,query,where  };
