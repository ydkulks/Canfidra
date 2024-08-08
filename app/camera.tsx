"use client";
import { useRef, useEffect, useState } from "react";

// import "firebase/firestore"

// const servers = {
//   iceServers: [
//     {
//       urls: ['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
//     },
//   ],
//   iceCandidatePoolSize: 10,
// }
// let pc = new RTCPeerConnection(servers);
// let localStream = null;
// let remoteStream = null;
// console.log(pc);

interface CameraProps {
  camera: boolean;
}

const Camera: React.FC<CameraProps> = ({ camera }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const constraints = { video: {camera,width:1090, height:800} };

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
