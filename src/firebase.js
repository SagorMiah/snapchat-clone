import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBkWEaFZCIyVLpeUQL8l6mGICt_Z23mjAk",
  authDomain: "snapchat-clone-366ec.firebaseapp.com",
  projectId: "snapchat-clone-366ec",
  storageBucket: "snapchat-clone-366ec.appspot.com",
  messagingSenderId: "1016008603049",
  appId: "1:1016008603049:web:7813de30eb4105d39680b8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
