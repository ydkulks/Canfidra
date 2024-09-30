"use client";
// import Navbar from "./navbar";
import Camera from "./camera";
import Microphone from "./microphone";
import Screen_Share from "./screen_share";
import Chat from "./chat";
import Signin from "./signin";
import {
  IcRoundVideocam,
  IcBaselineMic,
  IcRoundScreenShare,
  IcRoundAccountCircle,
  IcRoundMessage,
  IcRoundCallEnd,
  Logout,
} from "./icons";
import { Dispatch, SetStateAction, useState } from "react";

// Import the functions you need from the firebase SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Import the hooks for firebase
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";
// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Socket.io
import { io } from "socket.io-client";
// NOTE: Change the URL in production
const socket = io('http://localhost:4000');
var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var turnReady;

var pcConfig = {
  'iceServers': [{
    'urls': 'stun:stun.l.google.com:19302'
  }]
};

// Set up audio and video regardless of what devices are present.
var sdpConstraints = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};


interface AccountProps {
  account: boolean;
  room_name: string | null;
  numClients: number;
}
const UserSettings: React.FC<AccountProps> = ({ account, room_name, numClients }) => {
  return (
    <div>
      {account ? (
        <div className="absolute left-1 right-auto top-auto bottom-16 h-15">
          <div className="bg-zinc-800 h-full p-5 rounded-lg">
            <p className="p-2 text-sm">Room: <span className="text-gray-300">{room_name}</span></p>
            <p className="p-2 text-sm">Clients: <span className="text-gray-300">{numClients}</span></p>
            <button
              className="inline-flex text-sm hover:text-gray-400"
              onClick={() => signOut(auth)}>
              <Logout />&nbsp;Singout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

interface RoomProps {
  room_name: string | null;
}

interface GetRoomProps {
  set_room_name: Dispatch<SetStateAction<null>>;
  set_room: Dispatch<SetStateAction<boolean>>;
}

const GetRoom: React.FC<GetRoomProps> = ({ set_room_name, set_room }) => {
  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    set_room(true)
    set_room_name(event.currentTarget.roomname.value);
  };

  return (
    <div className="lg:flex justify-center items-center">
      <div className="flex px-16 items-center bg-gray-100 lg:w-1/2 lg:h-[100vh] h-[50vh]">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Join Room</h2>
          <p className="text-gray-500 mt-4">
            To join the virtual meeting room, please enter the exact name of the room where you wish to meet. This information will help us locate and connect you with the relevant meeting participants.
          </p>
        </div>
      </div>
      <div className="flex justify-center p-1 lg:w-1/2 h-[50vh] items-center">
        <form className="border border-gray-400 rounded-md p-4 h-fit" onSubmit={handleFormSubmission}>
          <input type="text" id="roomname" name="roomname"
            className="border border-white rounded-md p-2 w-full my-2 bg-gray-800"
            placeholder="Room name" required />
          <button className="px-4 py-2 font-bold bg-black w-full border border-white rounded-md my-2 hover:bg-white hover:text-black" type="submit">Join</button>
        </form>
      </div>
    </div>
  );
}

const Room: React.FC<RoomProps> = ({ room_name }) => {
  const [user]: any = useAuthState(auth);
  const [account, setAccount] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const [callState, setCallState] = useState(false);
  const [message, setMessage] = useState(false);
  const [numClients, setNumClients] = useState(0)
  // TODO: Join a room

  // Send
  if (room_name !== null) {
    socket.emit('create or join', room_name);
    // console.log('Attempted to create or  join room', room_name);
  }
  // Receive
  socket.on('created', function(room_name, id, clients) {
    console.log('Created room ' + room_name + id + clients);
    setNumClients(clients)
    isInitiator = true;
  });

  socket.on('full', function(room_name) {
    console.log('Room ' + room_name + ' is full');
  });

  socket.on('join', function() {
    isChannelReady = true;
  });

  socket.on('joined', function(room_name, id, clients) {
    console.log('joined: ' + room_name + id);
    setNumClients(clients)
    isChannelReady = true;
  });

  return (

    <main className="bg-zinc-900">
      <Chat message={message} user={user.displayName} room={room_name} />
      <UserSettings account={account} room_name={room_name} numClients={numClients} />
      <div className="min-h-[93vh]">
        {/*<Navbar />*/}
        <Camera camera={camera} />
        <Screen_Share screenShare={screenShare} />
        <Microphone mic={mic} />
      </div>

      {/* Buttons for Video, Audio and Screen share*/}
      <div className="sticky w-full bottom-0 flex justify-between">
        <div>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${account ? "bg-red-500" : ""
              }`}
            onClick={() => setAccount(!account)}
          >
            <IcRoundAccountCircle />
          </button>
        </div>
        <div>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${camera ? "bg-red-500" : ""
              }`}
            onClick={() => setCamera(!camera)}
          >
            <IcRoundVideocam />
          </button>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${mic ? "bg-red-500" : ""
              }`}
            onClick={() => setMic(!mic)}
          >
            <IcBaselineMic />
          </button>
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${screenShare ? "bg-red-500" : ""
              }`}
            onClick={() => setScreenShare(!screenShare)}
          >
            <IcRoundScreenShare />
          </button>
          <button
            className="m-2 p-2 rounded-full bg-red-500 hover:bg-red-600 px-5"
            onClick={() => setCallState(!callState)}
          >
            <IcRoundCallEnd />
          </button>
        </div>
        <div className="items-end">
          <button
            className={`m-2 p-2 rounded-full hover:dark:bg-slate-700 ${message ? "bg-red-500" : ""
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

export default function Main() {
  const [user] = useAuthState(auth);
  const [room, setRoom] = useState(false)
  const [room_name, setRoom_Name] = useState(null)

  return (
    <section>
      {/*{user ? <Room /> : <Signin />}*/}
      {user ? (
        room ? (
          <Room room_name={room_name} />
        ) : (
          <GetRoom set_room_name={setRoom_Name} set_room={setRoom} />
        )
      ) : (
        <Signin />
      )}
    </section>
  )
}
