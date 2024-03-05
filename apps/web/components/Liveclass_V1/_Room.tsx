"use client";
import { useRoom } from "./ContextAPI/RoomContext/RoomContext";
import { useSetUserData } from "./CustomHooks/useSetUserData";
import Joining from "./Joining";
import LiveClass from "./Video/LiveClass";

const Room = ({ roomid, user }: { roomid: string, user:any }) => {
  const { roomId } = useRoom();
  if(!roomId) {
    useSetUserData(user);
  }

  return roomId ? (
    <LiveClass roomid={roomId} />
  ): (
    <Joining roomid={roomid} user={user} />
  )
};

export default Room;
