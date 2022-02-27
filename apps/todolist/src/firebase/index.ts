import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  initializeFirestore
} from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const clientCredentials: FirebaseOptions = {
  apiKey: "AIzaSyBehraLx56BzqHr0gH_70ulwrvRR6ZKyFA",
  authDomain: "ibcarr.firebaseapp.com",
  projectId: "ibcarr",
  storageBucket: "ibcarr.appspot.com",
  messagingSenderId: "1045661802626",
  appId: "1:1045661802626:web:ffa86d186473858eebd49b",
  measurementId: "G-S6SCE6S548"
};

const app = initializeApp(clientCredentials);

const database = initializeFirestore(app, {
  ignoreUndefinedProperties: true
});
const auth = getAuth(app);
const functions = getFunctions(app);
// const analytics = getAnalytics(app);

if (process.env.NODE_ENV === "development") {
  const HOST = "127.0.0.1";

  connectFirestoreEmulator(database, HOST, 8080);
  connectAuthEmulator(auth, `http://${HOST}:9099`);
  connectFunctionsEmulator(functions, HOST, 5001);
}

export { app, database, auth };
