'use client'

import VideoPlayer from "./Video/VideoPlayer";
import { Button } from "../ui/button"
import { useRoom } from "./ContextAPI/RoomContext/RoomContext";
import { Plus } from "lucide-react";
import { ws } from "./ContextAPI/Connection_WS_Peerjs";
import { useState } from "react";

const Joining = ({ roomid, user }: { roomid: string, user: any }) => {
  const { stream, setRoomId } = useRoom();
  const [roomActive, setRoomActive] = useState(true);
  ws.on("room-not-found", (roomId: string) => {
    setRoomActive(false);
    console.log("Room not found: ", roomId);
  });

  return roomActive ? (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <div className=" relative rounded-xl overflow-hidden">
        <VideoPlayer muted={true} className={' w-[30rem]'} stream={stream} />
        <div className=" transform scale-x-[-1] absolute h-16 bottom-0 w-full bg-teal-950/50 backdrop-blur flex items-center justify-center">
          <h1 className=" text-xl">
            {user?.name || ""}
          </h1>
        </div>
      </div>
      <div>Ready to join</div>
      <Button onClick={() => { setRoomId((roomid)) }} variant="secondary" className=" w-28">Join </Button>
    </div>
  ) : (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <div>Room not found</div>
    </div>
  )
}

export default Joining