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


const LiveClass = ({ roomid }: { roomid: string }) => {
  const { me, stream, peers, screenSharingId, username } = useRoom();
  const { isOpen, setIsOpen } = useChat();

  const screenSharingVideo = screenSharingId === me ? stream : peers[screenSharingId]?.stream;

  const {[screenSharingId]: sharing, ...peersToShow} = peers;

  return (
    <div className="flex flex-col h-lvh w-full">
      <div>RoomId: {roomid}</div>
      <div>Name: {username.name}</div>
      <div className="flex w-full h-full p-4 gap-2 ">
        <div className=" flex h-full flex-col gap-2 w-full lg:w-[70%] ">
          <div className=" rounded-md md:rounded-xl aspect-[9/16] sm:aspect-[2/3] xl:aspect-[10/8] border overflow-hidden">
            {/* Main Speacker */}
            {screenSharingId ? (
              <VideoPlayer stream={screenSharingVideo} className={'object-cover object-center h-full w-full'} />
            ) : (
               <VideoPlayer stream={stream} className={'object-cover object-center h-full w-full'} />
            )}
          </div>
          <ScrollArea className=" flex min-h-[15%] whitespace-nowrap md:rounded-xl rounded-md border">
            <div className=" flex h-fit flex-row space-x-4 px-4 py-2 md:p-4">
              {screenSharingId !== me && (
                <div className="h-[5rem] w-[8rem] md:h-[95px] md:w-[200px] border rounded-md md:rounded-xl overflow-hidden">
                  <VideoPlayer stream={stream} className=" " />
                </div>
              
              )}
              {Object.values(peersToShow as PeerState).map((peer) => (
                <div className="h-[5rem] w-[8rem] md:h-[95px] md:w-[200px] border rounded-md md:rounded-xl overflow-hidden">
                  <VideoPlayer stream={peer.stream} className=" " />
                </div>
              ))}

            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <ActionButtons setIsOpen={setIsOpen} />
        </div>
        <div className=" rounded-xl hidden lg:flex justify-center w-full h-full lg:w-[30%] ">
          <ChatPanel />
        </div>
        {isOpen && (
          <div className=" flex lg:hidden backdrop-blur fixed top-0 left-0 w-full h-full items-center justify-center">
            <div className=" relative w-[90%] h-[90%] ">
              <ChatPanel />
              <div className=" absolute right-1 top-1">
                <Button
                  className=" px-2"
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

