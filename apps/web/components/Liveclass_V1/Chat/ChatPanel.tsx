import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import InputField from "./InputField";
import { useChat } from "../ContextAPI/ChatContext/ChatContext";
import { useRoom } from "../ContextAPI/RoomContext/RoomContext";
import Image from "next/image";
import { CircleUser } from "lucide-react";



const ChatPanel: React.FC = () => {
  const { messages } = useChat();
  const { username } = useRoom();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);

  return (
    <Card className="w-full  justify-center flex">
      <Tabs
        defaultValue="chat"
        className=" p-2 w-full flex flex-col items-center"
      >
        <TabsList className="w-full">
          <TabsTrigger value="chat" className="w-full">Chat</TabsTrigger>
          <TabsTrigger value="attendance" className="w-full">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="w-full">
          <ScrollArea className=" min-h-[26rem] max-h-[300px] md:max-h-[500px] lg:max-h-[680px] w-full border-b border-t">
            <div className="flex-col flex p-2" ref={scrollRef}>
            {messages.map((message: any, index: number) =>
              username?.name !== message?.username?.name ? (
                <div key={index} className=" my-2 w-full flex ">
                  <div className="relative flex flex-row items-center gap-2 justify-start p-2 w-fit">
                    <div className="absolute w-8 h-8 top-2 left-2 dark:bg-gray-300 rounded-full overflow-hidden justify-self-end">
                      {message?.username?.image ? <Image src={message?.username?.image} className="object-cover" alt="avatar" width={32} height={32} /> : <CircleUser className="w-[32px] h-[32px]" />}
                    </div>
                    <div className="w-full flex flex-col ml-10 border p-2 rounded-lg bg-teal-200 dark:bg-teal-950">
                      <p className="font-semibold text-xs self-start dark:text-teal-500">{message?.username?.name}</p>
                      <p className=" max-w-[20ch]">{message.message}</p>
                    </div>
                  </div>
                </div>
              ) :
                (
                  <div key={index} className=" my-2 justify-end w-full flex">
                    <div className=" relative flex flex-row items-center gap-2 justify-end p-2 w-fit ">
                      <div className="w-full flex flex-col mr-10 border p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800">
                        <p className="font-semibold text-xs self-end text-zinc-400 dark:text-zinc-500">{message.username.name}</p>
                        <p className=" max-w-[20ch]">{message.message}</p>
                      </div>
                      <div className=" absolute w-8 h-8 top-2 right-2 dark:bg-zinc-800 rounded-full overflow-hidden justify-self-end">
                        {username?.image ? <Image src={username.image} className="object-cover" alt="avatar" width={32} height={32} /> : <CircleUser className="w-[32px] h-[32px]" />}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </ScrollArea>
          <InputField />
        </TabsContent>
        <TabsContent value="attendance">Coming Soon.</TabsContent>
      </Tabs>
    </Card>
  );
}

export default ChatPanel