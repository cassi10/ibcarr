import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const clientCredentials = {
  apiKey: "AIzaSyBehraLx56BzqHr0gH_70ulwrvRR6ZKyFA",
  authDomain: "ibcarr.firebaseapp.com",
  projectId: "ibcarr",
  storageBucket: "ibcarr.appspot.com",
  messagingSenderId: "1045661802626",
  appId: "1:1045661802626:web:ffa86d186473858eebd49b",
  measurementId: "G-S6SCE6S548"
};

const app = initializeApp(clientCredentials);
const database = getFirestore(app);
const auth = getAuth(app);
const analytics = (await isSupported()) && getAnalytics(app);

export { app, database, auth, analytics };
