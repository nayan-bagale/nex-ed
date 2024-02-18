"use client";
import { useChat } from "./ContextAPI/RoomContext/ChatContext";
import VideoRoom from "./VideoRoom";
import Joining from "./Joining";

const Chatting = ({ roomid }: { roomid: string }) => {
  const { roomId } = useChat();

  return roomId ? (
    <VideoRoom roomid={roomId} />
  ): (
    <Joining roomid={roomid} />
  )
};

export default Chatting;
