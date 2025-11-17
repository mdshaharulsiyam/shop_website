import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMtslSk_Dezxa6knjEMCSxKZYm2iQ39Zk",
  authDomain: "multivendor-shop-8c79d.firebaseapp.com",
  projectId: "multivendor-shop-8c79d",
  storageBucket: "multivendor-shop-8c79d.firebasestorage.app",
  messagingSenderId: "912381620809",
  appId: "1:912381620809:web:344b08f00d64386619c598"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
