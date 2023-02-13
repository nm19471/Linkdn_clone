import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBknc-BNmztZFzvSctB5VWxEMtdR4ixQHI",
  authDomain: "linkdn-clone-28f4d.firebaseapp.com",
  projectId: "linkdn-clone-28f4d",
  storageBucket: "linkdn-clone-28f4d.appspot.com",
  messagingSenderId: "230249221193",
  appId: "1:230249221193:web:f5d701d2b944da000f0398",
  measurementId: "G-8XVYYDJVK8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

export const postsRef = collection(db,"POST");
export const postsQuery = query(postsRef,orderBy("timestamp","desc"));