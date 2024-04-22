"use client";
import { schedule_meetingT } from "@/database/schema";
import { useRoom } from "./ContextAPI/RoomContext/RoomContext";
import { useSetUserData } from "./CustomHooks/useSetUserData";
import Joining from "./Joining";
import LiveClass from "./Video/LiveClass";
import { useSetRecoilState } from "recoil";
import { meetingDetails } from "./Recoil/atoms";
import { useEffect } from "react";

const Room = ({ roomid, user, meeting }: { roomid: string, user: any, meeting: schedule_meetingT }) => {
  const { roomId } = useRoom();

  if(!roomId) {
    useSetUserData(user);
  }

  return roomId ? (
    <LiveClass roomid={roomId} />
  ): (
    <Joining roomid={roomid} meeting={meeting} user={user} />
  )
};

export default Room;
