// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDVS5ZzLhSNh6SVeLynBq55XGJxrsU5gYw',
  authDomain: 'react-cursos-46e34.firebaseapp.com',
  projectId: 'react-cursos-46e34',
  storageBucket: 'react-cursos-46e34.appspot.com',
  messagingSenderId: '294342355402',
  appId: '1:294342355402:web:8875a892475f370f5fc733',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
