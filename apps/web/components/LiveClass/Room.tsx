"use client";
import { useRoom } from "./ContextAPI/RoomContext/RoomContext";
import Joining from "./Joining";
import LiveClass from "./LiveClass";

const Room = ({ roomid, user }: { roomid: string, user:any }) => {
  const { roomId, setUsername } = useRoom();
  if(!roomId) {
    setUsername(user?.user?.name);
  }

  return roomId ? (
    <LiveClass roomid={roomId} />
  ): (
    <Joining roomid={roomid} user={user} />
  )
};

export default Room;
