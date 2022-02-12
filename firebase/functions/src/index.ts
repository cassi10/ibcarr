import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const onUserCreate = functions
  .region("europe-west2")
  .auth.user()
  .onCreate(async (user) => {
    await admin.firestore().collection("todolist").doc(user.uid).create({
      todoLabels: []
    });
    await admin.firestore().collection("games").doc(user.uid).create({
      hangman: {},
      cardmatch: {}
    });
  });

const onUserDelete = functions
  .region("europe-west2")
  .auth.user()
  .onDelete(async (user) => {
    await admin
      .firestore()
      .recursiveDelete(admin.firestore().collection("todolist").doc(user.uid));
    await admin.firestore().collection("games").doc(user.uid).delete();
  });

export { onUserCreate, onUserDelete };
