"use client";
import { useRef, useEffect, useState } from "react";

interface CameraProps {
  camera: boolean;
}

const Camera: React.FC<CameraProps> = ({ camera }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const constraints = { video: camera };

    if (camera) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          let video: HTMLVideoElement = videoRef.current!;
          video.srcObject = stream;
          setCameraStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    } else if (cameraStream) {
      cameraStream.getTracks().forEach((track) => {
        track.stop();
      });
      setCameraStream(null);
    }

    // Cleanup: Stop the camera stream when the component unmounts
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [camera]);

  return (
    <div>
      <div>{camera ? <video ref={videoRef} autoPlay /> : null}</div>
    </div>
  );
};

export default Camera;
