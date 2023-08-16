"use client";
import Navbar from "./navbar";
import Video_Audio from "./video_audio";
import Screen_Share from "./screen_share";
import FunctionalTray from "./functional_tray";
import { useState } from "react";
export default function Home() {
  const [isScreenShare, setIsScreenShare] = useState(false);
  const screensharetoggle = () => {
    if (isScreenShare) {
      setIsScreenShare(false);
    } else {
      setIsScreenShare(true);
    }
  };
  return (
    <main className="p-10">
      <Navbar />
      <h3 className="text-3xl">Confidra</h3>
      <Video_Audio />
      <button onClick={screensharetoggle}>Screen Share</button>
      {isScreenShare && <Screen_Share />}
      <FunctionalTray />
    </main>
  );
}
