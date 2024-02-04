"use client";

import React, { createContext, useEffect, useState, useReducer } from "react";
import socketIOClient from "socket.io-client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Peer from "peerjs";
import { peerReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

type RoomProviderProps = {
  children: React.ReactNode;
};

const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const router = useRouter();
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});

  const enterRoom = (roomId: string) => {
    router.push(`/liveclass/${roomId}`);
  };

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  };

  const getUsers = ({
    roomId,
    participants,
  }: {
    roomId: string;
    participants: string[];
  }) => {
    // console.log({roomId, participants})
  };

  useEffect(() => {
    const meId = uuidv4();

    const peer = new Peer(meId, {
      // host: "localhost",
      // port: 9000,
      // path: "/",
      // config: {
      //   iceServers: [
      //     { 'url': 'stun:stun.l.google.com:19302' },
      //     // { url: "relay1.expressturn.com:3478",
      //       // username:'efPU52K4SLOQ34W2QY',
      //       // credential:'1TJPNFxHKXrZfelz'
      //   // },
      //   ],
      //   // iceTransportPolicy: "relay",
      // },
      // debug: 3,
    });
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          setStream(stream);
        });
    } catch (e) {
      console.log(e);
    }

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("user-disconnected", removePeer);

    // return () => {
    //   ws.off("room-created", enterRoom);
    //   ws.off("get-users", getUsers);
    // };
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    ws.on("user-joined", ({ peerId }) => {
      const call = me.call(peerId, stream);
      console.log(call);
      call.on("stream", (peerStream) => {
        console.log(peerStream);
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    // console.log(me);

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });

    // return () => {
    //   ws.off("user-joined");
    // };
  }, [me, stream]);

  return (
    <RoomContext.Provider value={{ ws, me, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
