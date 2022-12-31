import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOc6asFqCIYFWiMGXdlk4hAODbYKBT_Ko",
  authDomain: "hibee-f47cd.firebaseapp.com",
  projectId: "hibee-f47cd",
  storageBucket: "hibee-f47cd.appspot.com",
  messagingSenderId: "783184179766",
  appId: "1:783184179766:web:e16a901207ce0d6cffde97",
  measurementId: "G-FNGGND151R"
};

const app = !getApps().length > 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);


export { app, db };
