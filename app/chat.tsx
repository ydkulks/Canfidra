"use client";
import { IcRoundSend } from "./icons";
import { useState } from "react";
import { io } from 'socket.io-client';

// NOTE: Change URL for production
const socket = io("http://localhost:4000");

interface ChatType {
  user: String;
  message: String;
}

const ChatBubble: React.FC<ChatType> = ({ user, message }) => {
  return (
    <div className="grid justify-end">
      <div className="flex my-1 justify-end">
        <p className="dark:text-slate-400 text-sm">{user}</p>
      </div>
      <div className="dark:bg-green-900 text-sm w-fit max-w-[25ch] px-3 py-1 rounded-md overflow-hidden">
        <p className="break-words whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  )
}

interface MessageProps {
  message: boolean;
  user: any;
  room: null | string;
}

const Chat: React.FC<MessageProps> = ({ message, user, room }) => {
  const [inputValue, setInputValue] = useState("");
  // const [submittedValue, setSubmittedValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState<string[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      socket.emit('chat message', room, trimmedValue);
      setInputValue("");
    }
  };

  socket.on('chat message', (msg) => {
    // setSubmittedValue(msg)
    setSubmittedValue([...submittedValue, msg])
  })

  return (
    <div>
      {message ? (
        <div className="absolute right-2 left-auto top-2 h-[92%] w-96 overflow-y-auto bg-zinc-800 rounded-lg">
          <div className="min-w-10 max-w-20 min-h-[93%] p-5">
            {submittedValue && submittedValue.map((value, _index) => (
              <ChatBubble user={user} message={value} />
            ))}
          </div>
          <div className="sticky bottom-0 right-0 flex w-full">
            <form onSubmit={handleSubmit} className="flex m-2 w-full">
              <input
                className="focus:outline-none dark:bg-zinc-900 w-full rounded-l-md h-10 p-3 ml-1 text-sm"
                type="text"
                placeholder="Send a message"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                className="text-green-500 bg-zinc-900 hover:text-green-600 mr-1 rounded-r-md pr-2 pl-2"
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

export default Chat;
