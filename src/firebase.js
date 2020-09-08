import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDVJgkWK-8Ac43dO0DGFZB8qiYUeynMw1Q",
authDomain: "openstreetmap-8f962.firebaseapp.com",
databaseURL: "https://openstreetmap-8f962.firebaseio.com",
projectId: "openstreetmap-8f962",
storageBucket: "openstreetmap-8f962.appspot.com",
messagingSenderId: "469772430805",
appId: "1:469772430805:web:4d8592ab094627660ae15c"
});

export const db = firebaseApp.firestore();