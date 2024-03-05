import socketIOClient from "socket.io-client";

export const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;

export const ws = socketIOClient(
  (WS_URL + ":" + process.env.NEXT_PUBLIC_WS_PORT!) as any
);
