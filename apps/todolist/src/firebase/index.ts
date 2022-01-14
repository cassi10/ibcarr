/**
 * * Add this back in when firebaseUI updates to firebase v9
 *
 * import { initializeApp } from "firebase/app";
 * import { getAuth } from "firebase/auth";
 * import { getFirestore } from "firebase/firestore";
 *
 * const firebaseApp = initializeApp(clientCredentials);
 * const firestore = getFirestore(firebaseApp);
 * const firebaseAuth = getAuth(firebaseApp);
 * export { firebaseApp, firestore, firebaseAuth };
 */

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

if (firebase.apps.length === 0) firebase.initializeApp(clientCredentials);

const auth = firebase.auth();
const firestore = firebase.firestore();

const providers = [firebase.auth.EmailAuthProvider.PROVIDER_ID];

export { auth, firestore, providers };
export default firebase;
