"use client";
import Navbar from "./navbar";
import Camera from "./camera";
import Microphone from "./microphone";
import Screen_Share from "./screen_share";
import { IcRoundVideocam, IcBaselineMic, IcRoundScreenShare } from "./icons";
import { useState } from "react";
export default function Home() {
  const [screenShare, setScreenShare] = useState(false);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      <Camera camera={camera} />
      <Microphone mic={mic} />
      <Screen_Share screenShare={screenShare} />

			{/* Buttons for Video, Audio and Screen share*/}
      <div className="absolute w-full bottom-0 flex justify-center">
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
        </div>
    </main>
  );
}
