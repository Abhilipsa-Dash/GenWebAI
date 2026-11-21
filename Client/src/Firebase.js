// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-f72be.firebaseapp.com",
  projectId: "genwebai-f72be",
  storageBucket: "genwebai-f72be.firebasestorage.app",
  messagingSenderId: "876499557495",
  appId: "1:876499557495:web:f578e427b80124f73b3a72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export {auth,provider }