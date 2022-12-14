import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: `"${process.env.REACT_APP_API_KEY}"`,
    authDomain: "electro-c34e9.firebaseapp.com",
    projectId: "electro-c34e9",
    storageBucket: "electro-c34e9.appspot.com",
    messagingSenderId: "250183968006",
    appId: "1:250183968006:web:62dc72c771310f2c1cea87",
    measurementId: "G-XK304EG656"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);