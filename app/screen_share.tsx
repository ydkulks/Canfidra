"use client";
import React from "react";
import { useRef, useEffect } from "react";
const Screen_Share = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const constraints:any = { video: { chromeMediaSource:'screen' }, audio: false };

    const successCallback = (stream: any) => {
      let video: any = videoRef.current;
      video.srcObject = stream;
    };

    const errorCallback = (err: any) => {
      console.error(err);
    };

    const media = navigator.mediaDevices.getDisplayMedia(constraints);
    media.then(successCallback).catch(errorCallback);
  }, []);

  return (
    <div>
      <div>
        <video
          className="border-solid border-2 rounded-lg border-slate-100"
          ref={videoRef}
          autoPlay
        />
      </div>
    </div>
  );
};

export default Screen_Share;
