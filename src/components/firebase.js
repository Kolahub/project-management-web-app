import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword }from "firebase/auth";
import { getFirestore }from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyA_QhR5oSKcTxaq14k3eb4Xv_hp3rEPGyk",
  authDomain: "project-management-web-a-5ebc9.firebaseapp.com",
  projectId: "project-management-web-a-5ebc9",
  storageBucket: "project-management-web-a-5ebc9.appspot.com",
  messagingSenderId: "1075468725094",
  appId: "1:1075468725094:web:8eec101eae3ca5660036a7",
  measurementId: "G-6CK676KNKC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore()
export const auth = getAuth()
// export const create = createUserWithEmailAndPassword()
const analytics = getAnalytics(app);