import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp(functions.config().firebase);
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const onUserCreate = functions.auth.user().onCreate(user => {
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
})

export const onUserUpdate = functions.firestore.document('Users/{Id}').onUpdate((change, context) => {
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
})