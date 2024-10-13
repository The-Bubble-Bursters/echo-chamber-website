// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getStorage } from "firebase/storage"; // For storage
import { getFunctions } from "firebase/functions"; // Import functions


// API keys for Firebase services are not secret
// see this for more - https://firebase.google.com/support/guides/security-checklist#api-keys-not-secret
const firebaseConfig = {
    apiKey: "AIzaSyDdnUFkveHeEVFIfk6ayJ-S-pr7tWRPQms",
    authDomain: "echo-chamber-427700.firebaseapp.com",
    databaseURL: "https://echo-chamber-427700-default-rtdb.firebaseio.com",
    projectId: "echo-chamber-427700",
    storageBucket: "echo-chamber-427700.appspot.com",
    messagingSenderId: "1017392512915",
    appId: "1:1017392512915:web:01946f6a39cd83fc0f7266",
    measurementId: "G-LS1T61WEG7"
};

// Function to initialize Firebase and handle errors
const initializeFirebase = () => {
    try {
        const app = initializeApp(firebaseConfig);
        return app;
    } catch (error) {
        console.error("Firebase initialization error:", error);
        alert("There was a problem initializing Firebase. Please try refreshing the page or check your internet connection.");
        return null; // Return null in case of failure
    }
};

// Initialize Firebase app
const app = initializeFirebase();

const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const storage = app ? getStorage(app) : null;
const functions = app ? getFunctions(app) : null;
export { auth, db, storage, functions };

export default app;
