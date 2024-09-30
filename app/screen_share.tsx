"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";

interface ScreenProps {
  screenShare: boolean;
}

const Screen_Share: React.FC<ScreenProps> = ({ screenShare }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const constraints: any = {
      video: {
        chromeMediaSource: "screen",
        width: 1300,
        height: 800,
      },
      audio: true,
    };

    if (screenShare) {
      navigator.mediaDevices
        .getDisplayMedia(constraints)
        .then((stream: MediaStream) => {
          let video: HTMLVideoElement = videoRef.current!;
          video.srcObject = stream;
          setScreenStream(stream);
        })
        .catch((error: any) => {
          console.error("Error accessing screen sharing:", error);
        });
    } else {
      if (screenStream) {
        screenStream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop();
        });
        setScreenStream(null);
      }
    }

    // Cleanup: Stop the screen sharing stream when the component unmounts
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop();
        });
      }
    };
  }, [screenShare]);

  return (
    <div>
      <div className="p-10">
        {screenShare ? <video className="rounded-lg h-fit w-auto" ref={videoRef} autoPlay muted playsInline /> : null}
      </div>
    </div>
  );
};

export default Screen_Share;
