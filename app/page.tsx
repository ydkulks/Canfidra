"use client";
import Navbar from "./navbar";
import Video_Audio from "./video_audio";
import Screen_Share from "./screen_share";
import FunctionalTray from "./functional_tray";
import { useState } from "react";
export default function Home() {
  const [screenShare, setScreenShare] = useState(false);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  // let screenShare:boolean = false;
  return (
    <main className="p-10 min-h-screen bg-slate-900">
      <Navbar />
      <h3 className="text-3xl">Confidra</h3>
      {camera && <Video_Audio />}
      {screenShare && <Screen_Share />}
      <div className="absolute bottom-0 w-11/12">
        <FunctionalTray
          screenShare={screenShare}
          setScreenShare={setScreenShare}
          mic={mic}
          setMic={setMic}
          camera={camera}
          setCamera={setCamera}
        />
      </div>
    </main>
  );
}
