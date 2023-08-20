"use client";
import Navbar from "./navbar";
import Camera from "./camera";
import Microphone from "./microphone";
import Screen_Share from "./screen_share";
import {
  IcRoundVideocam,
  IcBaselineMic,
  IcRoundScreenShare,
  IcRoundSend,
  IcRoundMessage,
  IcRoundPhoneDisabled,
  IcRoundAccountCircle,
} from "./icons";
import { useState } from "react";

interface MessageProps {
  message: boolean;
}
const Chat: React.FC<MessageProps> = ({ message }) => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      setSubmittedValue(inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      {message ? (
        <div className="absolute right-0 left-auto top-0 h-full">
          <div className="bg-gray-800 min-w-10 max-w-20 min-h-full p-5">
            <div className="">
              {submittedValue && (
                <div>
                  <IcRoundAccountCircle />
                  <p className="dark:text-slate-400">User name</p>
                  <div className="dark:bg-slate-600 w-fit px-3 py-1 rounded-md">
                    <p>{submittedValue}</p>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex my-2">
              <input
                className="dark:bg-slate-600 rounded-l-md h-10 p-3 ml-1 items-center"
                type="text"
                placeholder="Send a message"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                className="text-green-500 bg-slate-600 hover:text-green-600 mr-1 rounded-r-md pr-2 pl-2"
                type="submit"
              >
                <IcRoundSend />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default function Home() {
  const [account, setAccount] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const [callState, setCallState] = useState(false);
  const [message, setMessage] = useState(false);
  return (
    <main className="min-h-screen bg-slate-900">
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
            className="m-2 p-2 rounded-full bg-red-500 hover:bg-red-600"
            onClick={() => setCallState(!callState)}
          >
            <IcRoundPhoneDisabled />
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
