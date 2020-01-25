const firebaseConfig = {
    apiKey: "AIzaSyAQKk_SLE7Eg2Yc0hgDohryZwhX-6uMniw",
    authDomain: "quiz-20.firebaseapp.com",
    databaseURL: "https://quiz-20.firebaseio.com",
    projectId: "quiz-20",
    storageBucket: "quiz-20.appspot.com",
    messagingSenderId: "826693194930",
    appId: "1:826693194930:web:f1e330e7fd17b3e4f8a5ab",
    measurementId: "G-0J5T61Q8N1"
};
import firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const auth = firebase.auth();
export default {db,auth}