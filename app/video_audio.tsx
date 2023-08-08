"use client";
import React from "react";
import { useRef, useEffect } from "react";
const Video_Audio = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        let video: any = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, []);
  return (
    <div>
      <div className="border-solid border-2 border-slate-100">
        <video ref={videoRef} />
      </div>
    </div>
  );
};

export default Video_Audio;
