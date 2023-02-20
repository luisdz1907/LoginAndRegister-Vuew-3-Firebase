import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyDe0-evLuBNHUYL8OaSlWoWpa6Z5nDnJDk",
  authDomain: "vue-pinia-2023-bbb8a.firebaseapp.com",
  projectId: "vue-pinia-2023-bbb8a",
  storageBucket: "vue-pinia-2023-bbb8a.appspot.com",
  messagingSenderId: "907423747595",
  appId: "1:907423747595:web:1feab3e82de65525d8810e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore()
const auth =getAuth();

export { auth, db }