import firebase from "firebase";
import "firebase/storage";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAlMq6NcC827ilYgXCSgLk2K6Mi4xZ884c",
    authDomain: "varient-98164.firebaseapp.com",
    projectId: "varient-98164",
    storageBucket: "varient-98164.appspot.com",
    messagingSenderId: "1081059037620",
    appId: "1:1081059037620:web:47d6635a1385f3e4e6e2e1",
    measurementId: "G-F3PTLSYJMT"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage = firebase.storage();

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithPatient = async (email, password, name, age, gender, geneMutation, listofReports) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("Patients").doc(user.uid).set({
            uid: user.uid,
            name,
            age,
            gender,
            geneMutation,
            listofReports
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

export {
    auth,
    storage,
    db,
    registerWithPatient,
    signInWithEmailAndPassword,
    logout

}