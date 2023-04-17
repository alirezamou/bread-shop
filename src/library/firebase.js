import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBaa-BdNGsiBW96VDarxcV8jTYmSQMwk_M",
  authDomain: "bread-shop-f1dc2.firebaseapp.com",
  projectId: "bread-shop-f1dc2",
  storageBucket: "bread-shop-f1dc2.appspot.com",
  messagingSenderId: "77814646849",
  appId: "1:77814646849:web:76a7aa93ecd3c65f385ec0",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseStore = getFirestore(FirebaseApp);
