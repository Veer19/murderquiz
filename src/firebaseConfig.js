const firebaseConfig = {
    apiKey: "AIzaSyDO6kNhIHbCFx3OeR4KadRrfAm8_CpSItM",
    authDomain: "qrtine.firebaseapp.com",
    databaseURL: "https://qrtine.firebaseio.com",
    projectId: "qrtine",
    storageBucket: "qrtine.appspot.com",
    messagingSenderId: "858832924485",
    appId: "1:858832924485:web:11c1888623cba238ab182c",
    measurementId: "G-R37ZSTBTGT"
};
import firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const auth = firebase.auth();
export default {db,auth}