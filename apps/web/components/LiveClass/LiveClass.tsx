'use client'

import {UserNav} from "@/components/Layout/Header/AvatarOptions";
import NavBar from "@/components/Layout/Header/NavBar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { MessageCircleMore, Mic, Presentation, Video, X } from "lucide-react";
import ChatPanel from "./Chat/ChatPanel";
import { useState } from "react";
import { useChat } from "./ContextAPI/RoomContext/ChatContext";
import { PeerState } from "./ContextAPI/RoomContext/peerReducer";
import VideoPlayer from "./VideoPlayer";


const LiveClass = ({ roomid }: { roomid: string }) => {
  const { msgs, sendMsg, me, stream, peers, shareScreen } = useChat();


    const [bool, setBool] = useState(false);

  return (
    <div className="flex flex-col h-lvh w-full">
      <div>RoomId: {roomid}</div>
      <div className="flex w-full h-full p-4 gap-2 ">
        <div className=" flex h-full flex-col gap-2 w-full lg:w-[70%] ">
          <div className=" rounded-md md:rounded-xl aspect-[9/16] sm:aspect-[2/3] xl:aspect-[10/8] border overflow-hidden">
            {/* Main Speacker */}
            <VideoPlayer stream={stream} className={'object-cover object-center h-full w-full'} />
          </div>
          <ScrollArea className=" flex min-h-[15%] whitespace-nowrap md:rounded-xl rounded-md border">
            <div className=" flex h-fit flex-row space-x-4 px-4 py-2 md:p-4">
              {Object.values(peers as PeerState).map((peer) => (
                <div className="h-[5rem] w-[8rem] md:h-[95px] md:w-[200px] border rounded-md md:rounded-xl overflow-hidden">

                <VideoPlayer stream={peer.stream} className=" " />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className=" flex items-center justify-evenly mt-2 h-[3.5rem] md:h-[5rem] w-full">
            <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant={"outline"}>
                <Video />
              </Button>
              <p className="text-xs md:text-sm">Video</p>
            </div>

            <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant={"outline"}>
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
                onClick={() => setBool(true)}
              >
                <MessageCircleMore />
              </Button>
              <p className="text-xs md:text-sm">Chat</p>
            </div>
            <div className=" flex flex-col items-center">
              <Button className=" rounded-full px-2" variant="destructive">
                <X />
              </Button>
              <p className="text-xs md:text-sm">Leave</p>
            </div>
          </div>
        </div>
        <div className=" rounded-xl hidden lg:flex justify-center w-full h-full lg:w-[30%] ">
          <ChatPanel />
        </div>
        {bool && (
          <div className=" flex lg:hidden backdrop-blur fixed top-0 left-0 w-full h-full items-center justify-center">
            <div className=" relative w-[90%] h-[90%] ">
              <ChatPanel />
              <div className=" absolute right-1 top-1">
                <Button
                  className=" px-2"
                  variant="secondary"
                  onClick={() => setBool(false)}
                >
                  <X />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveClass

