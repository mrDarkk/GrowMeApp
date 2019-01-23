"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp(functions.config().firebase);
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
exports.onUserCreate = functions.auth.user().onCreate(user => {
    console.log(user);
    const id = user.uid;
    const roles = ["EndUser"];
    return admin.auth().setCustomUserClaims(id, { 'Roles': roles }).then(() => {
        const metadataCollection = admin.firestore().collection("metadata");
        return metadataCollection.doc(id).set({ refreshTime: new Date().getTime() });
    }).catch(error => {
        console.log(error);
        return error;
    });
});
exports.onUserUpdate = functions.firestore.document('Users/{Id}').onUpdate((change, context) => {
    const newValue = change.after.data();
    console.log(newValue);
    const id = context.params.Id;
    const roles = newValue.Roles;
    return admin.auth().setCustomUserClaims(id, { 'Roles': roles }).then(() => {
        const metadataCollection = admin.firestore().collection("metadata");
        return metadataCollection.doc(id).set({ refreshTime: new Date().getTime() });
    }).catch(error => {
        console.log(error);
        return error;
    });
});
//# sourceMappingURL=index.js.map