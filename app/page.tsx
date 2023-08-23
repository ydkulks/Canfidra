"use client";
import Navbar from "./navbar";
import Camera from "./camera";
import Microphone from "./microphone";
import Screen_Share from "./screen_share";
import Chat from "./chat";
import {
  IcRoundVideocam,
  IcBaselineMic,
  IcRoundScreenShare,
  IcRoundAccountCircle,
  IcRoundMessage,
  IcRoundCallEnd,
} from "./icons";
import { useState } from "react";

export default function Home() {
  const [account, setAccount] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const [callState, setCallState] = useState(false);
  const [message, setMessage] = useState(false);
  return (
    <main className="min-h-screen bg-zinc-900">
      <Navbar />
      <Chat message={message} />
      <Camera camera={camera} />
      <Microphone mic={mic} />
      <Screen_Share screenShare={screenShare} />

      {/* Buttons for Video, Audio and Screen share*/}
      <div className="absolute w-full bottom-0 flex justify-between">
        <div>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${
              account ? "bg-red-500" : ""
            }`}
            onClick={() => setAccount(!account)}
          >
            <IcRoundAccountCircle />
          </button>
        </div>
        <div>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${
              camera ? "bg-red-500" : ""
            }`}
            onClick={() => setCamera(!camera)}
          >
            <IcRoundVideocam />
          </button>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${
              mic ? "bg-red-500" : ""
            }`}
            onClick={() => setMic(!mic)}
          >
            <IcBaselineMic />
          </button>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${
              screenShare ? "bg-red-500" : ""
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
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${
              message ? "bg-red-500" : ""
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
