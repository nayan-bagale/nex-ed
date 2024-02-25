"use client";
import { useChat } from "./ContextAPI/RoomContext/ChatContext";
import Joining from "./Joining";
import LiveClass from "./LiveClass";

const Chatting = ({ roomid }: { roomid: string }) => {
  const { roomId } = useChat();

  return roomId ? (
    <LiveClass roomid={roomId} />
  ): (
    <Joining roomid={roomid} />
  )
};

export default Chatting;
