import React from 'react'
import { MessageCircleMore, Mic, Presentation, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoom } from '../ContextAPI/RoomContext/RoomContext';


const ActionButtons = ({ setIsOpen }: { setIsOpen:any}) => {
    const { shareScreen, leaveRoom, mute, pause } = useRoom();

  return (
      <div className=" flex items-center justify-evenly mt-2 h-[3.5rem] md:h-[5rem] w-full">
          <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant={"outline"}
                  onClick={pause}
              >
                  <Video />
              </Button>
              <p className="text-xs md:text-sm">Video</p>
          </div>

          <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant={"outline"}
                  onClick={mute}
              >
                  <Mic />
              </Button>
              <p className="text-xs md:text-sm">Mic</p>
          </div>
          <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant={"outline"} onClick={shareScreen}>
                  <Presentation />
              </Button>
              <p className="text-xs md:text-sm">Screen</p>
          </div>
          <div className=" flex flex-col items-center lg:hidden">
              <Button
                  className=" rounded-full px-2 bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => setIsOpen((prev:boolean) => !prev) }
              >
                  <MessageCircleMore />
              </Button>
              <p className="text-xs md:text-sm">Chat</p>
          </div>
          <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant="destructive"
                  onClick={leaveRoom}
              >
                  <X />
              </Button>
              <p className="text-xs md:text-sm">Leave</p>
          </div>
      </div>
  )
}

export default ActionButtons