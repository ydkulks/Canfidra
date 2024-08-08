"use client";
import { IcRoundSend } from "./icons";
import { useState } from "react";
import { io } from 'socket.io-client';

// import { initializeApp } from "firebase/app";
// import { collection, getFirestore } from "firebase/firestore";
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBXLnHNWsEm6jy_gnBBlKJRvsK-fqoxv7k",
//   authDomain: "confidra.firebaseapp.com",
//   projectId: "confidra",
//   storageBucket: "confidra.appspot.com",
//   messagingSenderId: "476318732772",
//   appId: "1:476318732772:web:a57658fb798868fe95f7f1",
//   measurementId: "G-5Z1MNDHZ9Z"
// };

// Initialize Firebase
// initializeApp(firebaseConfig);

// const messagesRef = collection(getFirestore(), 'messages');
// const query = messagesRef;
// const [messages] = useCollectionData(query);
// const [messages] = useCollectionData(query, { idField: 'id' });
// const [data] = useCollectionData(messagesRef);

// const socket = io("http://localhost:3000", { path: "/api/socket" });
const socket = io("http://localhost:4000");

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
      // setSubmittedValue(inputValue);
      socket.emit('chat message', trimmedValue);
      setInputValue("");
    }
  };

  socket.on('chat message', (msg) => {
    setSubmittedValue(msg)
  })

  return (
    <div>
      {message ? (
        <div className="absolute right-2 left-auto top-2 h-[92%] w-[278px]">
          <div className="bg-zinc-800 min-w-10 max-w-20 min-h-full p-5 rounded-lg">
            {submittedValue && (
              <div className="grid justify-end">
                <div className="flex my-1 justify-end">
                  <p className="dark:text-slate-400">You</p>
                </div>
                <div className="dark:bg-green-900 w-fit max-w-[25ch] px-3 py-1 rounded-md overflow-hidden">
                  <p className="break-words whitespace-pre-wrap">
                    {submittedValue}
                  </p>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 right-1 flex">
              <form onSubmit={handleSubmit} className="flex my-2">
                <input
                  className="focus:outline-none dark:bg-slate-600 rounded-l-md h-10 p-3 ml-1 text-sm"
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
        </div>
      ) : null}
    </div>
  );
};

export default Chat;
