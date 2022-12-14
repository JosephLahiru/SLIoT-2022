import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: `"${process.env.REACT_APP_API_KEY}"`,
    authDomain: "electro3-80114.firebaseapp.com",
    projectId: "electro3-80114",
    storageBucket: "electro3-80114.appspot.com",
    messagingSenderId: "499039930",
    appId: "1:499039930:web:c250f245895267a584cc83",
    measurementId: "G-M2W79GXR6X"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);