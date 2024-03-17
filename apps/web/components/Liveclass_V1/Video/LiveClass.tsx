'use client'

import { UserNav } from "@/components/Layout/Header/AvatarOptions";
import NavBar from "@/components/Layout/Header/NavBar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import ChatPanel from "../Chat/ChatPanel";
import { useState } from "react";
import { useRoom } from "../ContextAPI/RoomContext/RoomContext";
import { PeerState } from "../ContextAPI/RoomContext/peerReducer";
import VideoPlayer from "./VideoPlayer";
import ActionButtons from "./ActionButtons";
import { useChat } from "../ContextAPI/ChatContext/ChatContext";
import { Separator } from "@/components/ui/separator";


const LiveClass = ({ roomid }: { roomid: string }) => {
  const { me, stream, peers, screenSharingId, username } = useRoom();
  const { isOpen, setIsOpen } = useChat();

  const screenSharingVideo = screenSharingId === me ? stream : peers[screenSharingId]?.stream;

  const {[screenSharingId]: sharing, ...peersToShow} = peers;

  return (
    <div className="flex flex-col h-dvh w-full pt-12">
      <div className="flex w-full h-full p-4 gap-2 ">
        <div className=" relative flex h-[80%] md:h-full flex-col gap-2 w-full lg:w-[75%] ">
          {screenSharingId !== '' && <div className=" rounded-md md:rounded-xl aspect-[9/16] sm:aspect-[2/3] xl:aspect-[10/8] border overflow-hidden">
            {/* Main Speacker */}
              <VideoPlayer muted={false} stream={screenSharingVideo} className={'object-contain object-center h-full w-full'} />
          </div>}
          <ScrollArea className=" flex h-full" >
            <div className=" flex h-fit flex-wrap justify-center md:space-y-0 md:space-x-4 space-y-4 px-4 py-2 md:p-4">
              {(screenSharingId !== me) && (
                <div className="h-[250px] w-[260px] md:h-[210px] md:w-[300px] border rounded-md md:rounded-xl overflow-hidden">
                  <VideoPlayer muted={true} stream={stream} className=" transform scale-x-[-1] object-cover object-center h-full w-full" />
                </div>
              
              )}
              {Object.values(peersToShow as PeerState).map((peer) => (
                <div className="h-[250px] w-[260px] md:h-[210px] md:w-[300px] border rounded-md md:rounded-xl overflow-hidden">
                  <VideoPlayer muted={false} stream={peer.stream} className="transform scale-x-[-1] object-cover object-center h-full w-full" />
                  {/* <p>{peer.stream.id}</p> */}
                </div>
              ))}

            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <ActionButtons setIsOpen={setIsOpen} />
        </div>
        <div className=" rounded-xl hidden lg:flex justify-center w-full h-full lg:w-[25%] ">
          <ChatPanel />
        </div>
        {isOpen && (
          <div className=" flex z-20 lg:hidden backdrop-blur fixed top-0 left-0 w-full h-full items-center justify-center">
            <div className=" relative w-[90%] h-[90%] mt-16 ">
              <ChatPanel />
              <div className=" absolute right-1 -top-9 -z-10">
                <Button
                  className=" p-2 rounded-t-full shadow-xl"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
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

