'use client'

import VideoPlayer from "./VideoPlayer";
import { Button } from "../ui/button"
import { useRoom } from "./ContextAPI/RoomContext/RoomContext";

const Joining = ({ roomid, user }: { roomid: string, user:any }) => {
  const { stream, setRoomId } = useRoom();


  return (
    <div className='flex flex-col gap-10 items-center justify-center h-screen'>
      <h1>{user?.user?.name || ""}</h1>
      <VideoPlayer className={''} stream={stream} />
      <div>Ready to join</div>
      <div className="flex gap-2 ">
        <Button>Mute</Button>
        <Button >Camera Off</Button>
      </div>
      <Button onClick={() => { setRoomId((roomid)) }} variant="secondary">Joining</Button>
    </div>
  )
}

export default Joining