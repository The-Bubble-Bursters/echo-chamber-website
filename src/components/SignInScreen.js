// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { getAnalytics } from "firebase/analytics";

// Configure Firebase.
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
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

function SignInScreen() {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen
