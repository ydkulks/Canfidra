"use client";
// import Navbar from "./navbar";
import Camera from "./camera";
import Microphone from "./microphone";
import Screen_Share from "./screen_share";
import Chat from "./chat";
import Signin from "./signin";
import {
  IcRoundVideocam,
  IcBaselineMic,
  IcRoundScreenShare,
  IcRoundAccountCircle,
  IcRoundMessage,
  IcRoundCallEnd,
  Logout,
} from "./icons";
import { useState } from "react";

// Import the functions you need from the firebase SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Import the hooks for firebase
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";
// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AccountProps {
  account: boolean;
}
const UserSettings: React.FC<AccountProps> = ({ account }) => {
  return (
    <div>
      {account ? (
        <div className="absolute left-1 right-auto top-auto bottom-16 h-15">
          <div className="bg-zinc-800 h-full p-5 rounded-lg">
            <button
              className="inline-flex text-sm hover:text-gray-400"
              onClick={() => signOut(auth)}>
              <Logout />&nbsp;Singout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Room() {
  const [user]:any = useAuthState(auth);
  const [account, setAccount] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const [callState, setCallState] = useState(false);
  const [message, setMessage] = useState(false);
  return (

    <main className="bg-zinc-900">
      <Chat message={message} user={user.displayName} />
      <UserSettings account={account} />
      <div className="min-h-[93vh]">
        {/*<Navbar />*/}
        <Camera camera={camera} />
        <Screen_Share screenShare={screenShare} />
        <Microphone mic={mic} />
      </div>

      {/* Buttons for Video, Audio and Screen share*/}
      <div className="sticky w-full bottom-0 flex justify-between">
        <div>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${account ? "bg-red-500" : ""
              }`}
            onClick={() => setAccount(!account)}
          >
            <IcRoundAccountCircle />
          </button>
        </div>
        <div>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${camera ? "bg-red-500" : ""
              }`}
            onClick={() => setCamera(!camera)}
          >
            <IcRoundVideocam />
          </button>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${mic ? "bg-red-500" : ""
              }`}
            onClick={() => setMic(!mic)}
          >
            <IcBaselineMic />
          </button>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${screenShare ? "bg-red-500" : ""
              }`}
            onClick={() => setScreenShare(!screenShare)}
          >
            <IcRoundScreenShare />
          </button>
          <button
            className="m-2 p-2 rounded-full bg-red-500 hover:bg-red-600 px-5"
            onClick={() => setCallState(!callState)}
          >
            <IcRoundCallEnd />
          </button>
        </div>
        <div className="items-end">
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${message ? "bg-red-500" : ""
              }`}
            onClick={() => setMessage(!message)}
          >
            <IcRoundMessage />
          </button>
        </div>
      </div>
    </main>
  );
}

export default function Main() {
  const [user] = useAuthState(auth);
  return (
    <section>
      {user ? <Room /> : <Signin />}
    </section>
  )
}
