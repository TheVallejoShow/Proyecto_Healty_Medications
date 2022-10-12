// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";

// Conexión con la Base de Datos
import { 
  getFirestore, 
  collection,
  doc,
  addDoc, 
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  onSnapshot } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDetKCzvJJmoR4RqfaZGGeoJgqps2Ji1w",
  authDomain: "healthy-medications.firebaseapp.com",
  projectId: "healthy-medications",
  storageBucket: "healthy-medications.appspot.com",
  messagingSenderId: "702925753019",
  appId: "1:702925753019:web:9b8d1c0bb0f440c6ddb79e",
  measurementId: "G-WY6P3S1ZJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

// Enviar Datos
export const saveTask = (name, description, image) => {
  addDoc(collection(db, "tasks"), {name: name, description: description, image, image});
}

// Traer Datos
export const getTasks = () => getDocs(collection(db, "tasks"));

// Traer Datos instantaneamente
export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteMedicine = (id) => deleteDoc(doc(db, "tasks", id));

export const getMedicine = (id) => getDoc(doc(db, "tasks", id));

export const updateMedicine = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);