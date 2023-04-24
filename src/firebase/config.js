// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*
const firebaseConfig = {
  apiKey: 'AIzaSyDVS5ZzLhSNh6SVeLynBq55XGJxrsU5gYw',
  authDomain: 'react-cursos-46e34.firebaseapp.com',
  projectId: 'react-cursos-46e34',
  storageBucket: 'react-cursos-46e34.appspot.com',
  messagingSenderId: '294342355402',
  appId: '1:294342355402:web:8875a892475f370f5fc733',
};*/

//TESTING
const firebaseConfig = {
  apiKey: "AIzaSyBEPfEoSCrLLgxG6_cv-ZSDsDb4qjlCqcs",
  authDomain: "react-cursos-testing-ffddf.firebaseapp.com",
  projectId: "react-cursos-testing-ffddf",
  storageBucket: "react-cursos-testing-ffddf.appspot.com",
  messagingSenderId: "661430596507",
  appId: "1:661430596507:web:2d7a7d01cb5b6f9e52273e"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
