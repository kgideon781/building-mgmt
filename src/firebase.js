import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAoh7D-Lv8Xh5JgPW1VE-vRZfXloxtFRHY",
    authDomain: "integrated-building-ms.firebaseapp.com",
    projectId: "integrated-building-ms",
    storageBucket: "integrated-building-ms.appspot.com",
    messagingSenderId: "894245521133",
    appId: "1:894245521133:web:ac9c305d24d69b389deee4"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };