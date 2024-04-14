import Peer from "peerjs";
import socketIOClient from "socket.io-client";

export const ws = socketIOClient(process.env.NEXT_PUBLIC_WS_URL!);


export const rtcpeer = () => {
  const uid = crypto.randomUUID();

  return new Peer(uid, {
    path: "/myapp",
    host: process.env.NEXT_PUBLIC_PEER_URL!,
    port: parseInt(process.env.NEXT_PUBLIC_PEER_PORT!),
    secure: true,
    debug: 3,
  });
};
