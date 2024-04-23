import Peer from "peerjs";
import socketIOClient from "socket.io-client";
import cryptoRandomString from "crypto-random-string";

export const ws = socketIOClient(process.env.NEXT_PUBLIC_WS_URL!);


export const rtcpeer = () => {
  const uid = cryptoRandomString({ length: 10, type: "alphanumeric" });

  return new Peer(uid, {
    path: "/myapp",
    host: process.env.NEXT_PUBLIC_PEER_URL!,
    port: parseInt(process.env.NEXT_PUBLIC_PEER_PORT!),
    secure: true,
    debug: 3,
  });
};
