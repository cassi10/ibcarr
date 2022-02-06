import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const onUserCreate = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection("/users").doc(`/${user.uid}`).create({});
});

const onUserDelete = functions.auth.user().onDelete(async (user) => {
  await admin.firestore().collection("/users").doc(`/${user.uid}`).delete();
});

export { onUserCreate, onUserDelete };
