'use client'

import VideoPlayer from "./Video/VideoPlayer";
import { Button } from "../ui/button"
import { useRoom } from "./ContextAPI/RoomContext/RoomContext";
import { Info } from "lucide-react";

import { schedule_meetingT } from "@/database/schema";
import { Separator } from "../ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Joining = ({ roomid, user, meeting }: { roomid: string, user: any, meeting: schedule_meetingT }) => {
  const { stream, setRoomId, setMeeting } = useRoom();

  const handleclick = () => {
    setMeeting(meeting);
    setRoomId((roomid))
  }

  return (

    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <div className=" flex justify-between items-center md:w-[30rem]">

        <h1 className=" text-xl ">{meeting.title}</h1>
        <Popover>
          <PopoverTrigger>
            <Button variant='ghost' className=" rounded-full p-2">
              <Info className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className=" flex flex-col gap-2">
              <h2>Meeting Details:</h2>
              <Separator />
              <div className=" flex gap-4 justify-between">
                <h3>Visibility:</h3>
                <p>{meeting.visibility ? 'Public' : 'Private'}</p>
              </div>
              <div className=" flex gap-4 justify-between">
                <h3>Start Time:</h3>
                <p>{meeting.start_time}</p>
              </div>
              <div className=" flex gap-4 justify-between">
                <h3>Duration:</h3>
                <p>{ }</p>
              </div>
              <div className=" flex gap-4 justify-between">
                <h3>Teacher</h3>
                <p>Prof. { }</p>
              </div>
              <div className=" flex gap-4 justify-between">
                <h3>Camera Always On:</h3>
                <p>{meeting.camera ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className=" relative rounded-xl overflow-hidden">
        <VideoPlayer muted={true} className={' transform scale-x-[-1] w-[30rem]'} stream={stream} />
        <div className="  absolute h-16 bottom-0 w-full bg-white/50 dark:bg-teal-950/50 backdrop-blur flex items-center justify-center">
          <h1 className=" text-xl">
            {user?.name || ""}
          </h1>
        </div>
      </div>
      <div>Ready to join</div>
      <Button onClick={handleclick} variant="secondary" className=" w-28">Join </Button>
    </div>
  )
}

export default Joining