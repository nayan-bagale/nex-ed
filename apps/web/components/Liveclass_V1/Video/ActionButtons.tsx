
import { MessageCircleMore, Mic, Presentation, Video, X, VideoOff, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoom } from '../ContextAPI/RoomContext/RoomContext';
import { useState } from "react";


const ActionButtons = ({ setIsOpen }: { setIsOpen:any}) => {
    const { shareScreen, leaveRoom, mute, pause } = useRoom();

    const [cameraOff, setCameraOff] = useState(false)
    const [micOff, setMicOff] = useState(false)


    const handleCamera = () => {
        setCameraOff((prev) => !prev)
        pause();
    }

    const handleMic = () => {
        setMicOff((prev) => !prev)
        mute();
    }
    

  return (
      <div className=" fixed bottom-1 border-t left-0 md:static flex items-center justify-evenly mt-2 h-[4.8rem] md:h-[5rem] md:w-[50%] w-full md:self-center md:border rounded-2xl">
          <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant={"outline"}
                  onClick={handleCamera}
              >
                  {cameraOff ? <VideoOff/> : <Video />}
              </Button>
              <p className="text-xs md:text-sm">Video</p>
          </div>

          <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant={"outline"}
                  onClick={handleMic}
              >
                  {micOff ? <MicOff/> : <Mic />}
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