import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const clientCredentials: FirebaseOptions = {
  apiKey: "AIzaSyBehraLx56BzqHr0gH_70ulwrvRR6ZKyFA",
  authDomain: "ibcarr.firebaseapp.com",
  projectId: "ibcarr",
  storageBucket: "ibcarr.appspot.com",
  messagingSenderId: "1045661802626",
  appId: "1:1045661802626:web:bc79b16651aa91b9ebd49b",
  measurementId: "G-J6F3G2E7KZ"
};

const app = initializeApp(clientCredentials);
const analytics = getAnalytics(app);

export { app, analytics };
