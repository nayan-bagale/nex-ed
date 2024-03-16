'use client'

import VideoPlayer from "./Video/VideoPlayer";
import { Button } from "../ui/button"
import { useRoom } from "./ContextAPI/RoomContext/RoomContext";
import { Plus } from "lucide-react";

const Joining = ({ roomid, user }: { roomid: string, user: any }) => {
  const { stream, setRoomId } = useRoom();

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <div className=" relative rounded-xl overflow-hidden">
        <VideoPlayer muted={true} className={' w-[30rem]'} stream={stream} />
        <div className=" absolute h-16 bottom-0 w-full bg-teal-950/50 backdrop-blur flex items-center justify-center">
          <h1 className=" text-xl">
            {user?.name || ""}
          </h1>
        </div>
      </div>
      {/* <div className="flex gap-2 ">
        <Button>Mute</Button>
        <Button >Camera Off</Button>
      </div> */}
      <div>Ready to join</div>
      <Button onClick={() => { setRoomId((roomid)) }} variant="secondary" className=" w-28">Join </Button>
    </div>
  )
}

export default Joining