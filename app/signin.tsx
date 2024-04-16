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
      <div className="rounded-lg border border-gray-500 mx-auto max-w-sm shadow-lg">
        <div className="flex flex-col p-6 space-y-2">
          <div className="flex justify-center">
            <div className="w-[100px] h-[100px] aspect-[1/1] overflow-hidden rounded-lg border border-gray-500">
            </div>
          </div>
          <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold text-center">Login</h3>
          <p className="text-sm text-muted-foreground text-center">
            Enter your username and password to login to your account
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Username
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-500 border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="username" placeholder="Enter your username" required type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-500 border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password" required type="password" />
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-100 text-gray-900 hover:bg-transparent hover:border hover:border-gray-500 hover:text-gray-100 h-10 px-4 py-2 w-full"
              type="submit">
              Login
            </button>
            <div className="mt-4 text-center text-sm hover:text-gray-300">
              <a className="underline" href="#">
                Forgot your password?
              </a>
            </div>
            <p className="flex justify-center">Or</p>
            <div className="flex justify-center">
              <button
                className="inline-flex text-sm bg-slate-900 w-full px-20 py-3 rounded-md hover:bg-gray-100 hover:text-gray-900 border border-gray-500"
                onClick={signInWithGoogle}>
                <GoogleLogo />&nbsp;
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
