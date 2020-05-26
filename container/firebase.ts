import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAfeyW2yf4K6etfvUIxbITulX4Pxdty3b8",
    authDomain: "relati.firebaseapp.com",
    databaseURL: "https://relati.firebaseio.com",
    projectId: "relati",
    storageBucket: "relati.appspot.com",
    messagingSenderId: "1000749216227",
    appId: "1:1000749216227:web:5351c39a890e0d79e6b0d6",
    measurementId: "G-ET1X949KSS"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    Object.assign(globalThis, { firebase });
}

export default firebase;
