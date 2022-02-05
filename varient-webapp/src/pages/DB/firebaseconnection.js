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
const googleProvider = new firebase.auth.GoogleAuthProvider();



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

const SignUPWithGoogle = async (age, gender, geneMutation, listofReports) => {

    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const query = await db
            .collection("Patients")
            .where("uid", "==", user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection("Patients").add({
                uid: user.uid,
                name: user.displayName,
                age,
                gender,
                geneMutation,
                listofReports

            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }

};

const LoginWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const UpdategoogleDB = async (age, gender, geneMutation, listofReports) => {
    try {
        const res = app.auth().currentUser
        const user = res.user;
        await db.collection("Patients").doc(user.uid).set({
            uid: user.uid,
            name: user.displayName,
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



export {
    auth,
    storage,
    db,
    registerWithPatient,
    signInWithEmailAndPassword,
    logout,
    SignUPWithGoogle,
    UpdategoogleDB,
    LoginWithGoogle

}