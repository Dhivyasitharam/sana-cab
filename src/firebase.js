// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtvYkP3K8RC_sNtS_lsEKsARxnA8eCxFg",
  authDomain: "sana-cab.firebaseapp.com",
  databaseURL: "https://sana-cab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sana-cab",
  storageBucket: "sana-cab.firebasestorage.app",
  messagingSenderId: "338222568384",
  appId: "1:338222568384:web:451a584d09dd32c571ee25",
  measurementId: "G-KG6NQBS6R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const openDB = () => Promise.resolve(true);