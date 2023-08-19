'use client';
import React, { useEffect, useState } from "react";

interface MicrophoneProps {
  mic: boolean;
}

const Microphone: React.FC<MicrophoneProps> = ({ mic }) => {
  const [micStream, setMicStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const constraints = { audio: mic };

    if (mic) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          setMicStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    } else if (micStream) {
      micStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMicStream(null);
    }

    // Cleanup: Stop the microphone stream when the component unmounts
    return () => {
      if (micStream) {
        micStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [mic]);

	// Play audio from the microphone stream
  useEffect(() => {
    if (micStream) {
      const audio = new Audio();
      audio.srcObject = micStream;
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      // Cleanup: Stop playing audio when the component unmounts
      return () => {
        audio.pause();
        audio.srcObject = null;
      };
    }
  }, [micStream]);

  return null; // Since we don't need to render anything for the microphone
};

export default Microphone;
