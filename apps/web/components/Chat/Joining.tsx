'use client'

import VideoPlayer from "../WebRTC/VideoPlayer";
import { Button } from "../ui/button"
import { useChat } from "./ContextAPI/RoomContext/ChatContext";

const Joining = ({ roomid }: { roomid: string }) => {
    const { stream, setRoomId } = useChat();

  return (
    <div className='flex flex-col gap-10 items-center justify-center h-screen'>
      <VideoPlayer stream={stream} />
      <div>Ready to join</div>
      <div className="flex gap-2 ">
        <Button>Mute</Button>
        <Button>Camera Off</Button>
      </div>
      <Button onClick={() => { setRoomId((roomid)) }} variant="secondary">Joining</Button>
    </div>
  )
}

export default Joining