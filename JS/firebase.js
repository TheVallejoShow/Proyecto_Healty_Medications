// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

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
  onSnapshot } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDetKCzvJJmoR4RqfaZGGeoJgqps2Ji1w",
  authDomain: "healthy-medications.firebaseapp.com",
  databaseURL: "https://healthy-medications-default-rtdb.firebaseio.com",
  projectId: "healthy-medications",
  storageBucket: "healthy-medications.appspot.com",
  messagingSenderId: "702925753019",
  appId: "1:702925753019:web:9b8d1c0bb0f440c6ddb79e",
  measurementId: "G-WY6P3S1ZJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore();

// Enviar Datos
export const saveTask = (name, description, precautions, image, place) => {
  addDoc(collection(db, "tasks"), {name: name, description: description, precautions: precautions, image: image, place: place});
}

// Traer Datos
export const getTasks = () => getDocs(collection(db, "tasks"));

// Traer Datos instantaneamente
export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteMedicine = (id) => deleteDoc(doc(db, "tasks", id));

export const getMedicine = (id) => getDoc(doc(db, "tasks", id));

export const updateMedicine = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);

//const signInModal = document.getElementById("signInModal");
const signInModalForm = document.getElementById("signInModalForm");

signInModalForm.addEventListener("submit", function(event) {
  //No reiniciar el formulario
  event.preventDefault();
  const emailUser = document.querySelector("#userName").value;
  const userPassword = document.querySelector("#userPassword").value;

  /*createUserWithEmailAndPassword(auth, emailUser, userPassword)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("creado");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode:", errorCode);
    console.log("errorMessage:", errorMessage);
  });*/

  signInWithEmailAndPassword(auth, emailUser, userPassword)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    // Limpia el formulario
    signInModalForm.reset();
    
    console.log("Se logeo");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode:", errorCode);
    console.log("errorMessage:", errorMessage);
  });
})

const logoutInModal = document.getElementById("logoutInModal");

logoutInModal.addEventListener("click", function(event){
  event.preventDefault();
  signOut(auth).then(() => {
    console.log("Saliste")
    crearMedicamento.style.display = "none";
    ingresarUsuario.style.display = "flex";
    logoutInModal.style.display = "none";
  }).catch((error) => {
    // An error happened.
  });
})

const crearMedicamento = document.getElementById("crearMedicamento");
const ingresarUsuario = document.getElementById("ingresarUsuario"); 

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("estas logeado");
    crearMedicamento.style.display = "flex";
    ingresarUsuario.style.display = "none";
    logoutInModal.style.display = "flex";
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});