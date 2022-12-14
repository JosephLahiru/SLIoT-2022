import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: `"${process.env.REACT_APP_API_KEY}"`,
    authDomain: "electro2-1067e.firebaseapp.com",
    projectId: "electro2-1067e",
    storageBucket: "electro2-1067e.appspot.com",
    messagingSenderId: "133216985386",
    appId: "1:133216985386:web:afea221c3e6ef491187e53",
    measurementId: "G-8NDD4E8M5L"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);