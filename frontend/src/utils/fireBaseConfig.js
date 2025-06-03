// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp-rUQzFhfJCbDRaKGSPSgf2I6efQPT6s",
  authDomain: "dev-overflow-adv.firebaseapp.com",
  projectId: "dev-overflow-adv",
  storageBucket: "dev-overflow-adv.firebasestorage.app",
  messagingSenderId: "680189895534",
  appId: "1:680189895534:web:3064b692779df02829d77f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Auth = getAuth(app);

const Google_AuthProvider = new GoogleAuthProvider();
const Facebook_AuthProvider = new FacebookAuthProvider();
const Github_AuthProvider = new GithubAuthProvider();

export {
  Auth,
  Google_AuthProvider,
  Facebook_AuthProvider,
  Github_AuthProvider,
};
