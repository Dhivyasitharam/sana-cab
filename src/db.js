import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const openDB = () => Promise.resolve(true);

export async function dbAdd(storeName, data) {
  try {
    const colRef = collection(db, storeName);
    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...data };
  } catch (err) {
    console.error("dbAdd error:", err);
    throw err;
  }
}

export async function dbGetAll(storeName) {
  try {
    const colRef = collection(db, storeName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("dbGetAll error:", err);
    return [];
  }
}

export async function dbUpdate(storeName, data) {
  try {
    const { id, ...rest } = data;
    const docRef = doc(db, storeName, id);
    await updateDoc(docRef, rest);
    return data;
  } catch (err) {
    console.error("dbUpdate error:", err);
    throw err;
  }
}

export async function dbDelete(storeName, id) {
  try {
    const docRef = doc(db, storeName, id);
    await deleteDoc(docRef);
    return id;
  } catch (err) {
    console.error("dbDelete error:", err);
    throw err;
  }
}