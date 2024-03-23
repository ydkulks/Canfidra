"use client";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  GoogleLogo
} from "./icons";
import React from "react";

function Signin() {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBXLnHNWsEm6jy_gnBBlKJRvsK-fqoxv7k",
    authDomain: "confidra.firebaseapp.com",
    projectId: "confidra",
    storageBucket: "confidra.appspot.com",
    messagingSenderId: "476318732772",
    appId: "1:476318732772:web:a57658fb798868fe95f7f1",
    measurementId: "G-5Z1MNDHZ9Z"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const signInWithGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  return (
    <div className="bg-slate-900 p-2 min-h-screen">
      <div className="flex justify-center">
        <button
          className="inline-flex text-sm bg-slate-900 px-6 py-3 rounded-md hover:bg-slate-800 border border-zinc-600"
          onClick={signInWithGoogle}>
          <GoogleLogo />&nbsp;
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Signin;
