import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
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
if (process.env.NODE_ENV === "development")
  connectFirestoreEmulator(database, "127.0.0.1", 8080);

const auth = getAuth(app);
const analytics = (await isSupported()) && getAnalytics(app);

export { app, database, auth, analytics };
