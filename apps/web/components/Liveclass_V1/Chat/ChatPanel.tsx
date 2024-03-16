import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import InputField from "./InputField";
import { useChat } from "../ContextAPI/ChatContext/ChatContext";
import { useRoom } from "../ContextAPI/RoomContext/RoomContext";
import Image from "next/image";


const ChatPanel: React.FC = () => {
  const { messages } = useChat();
  const { username } = useRoom();

  return (
    <Card className="w-full  justify-center flex shadow-xl">
      <Tabs
        defaultValue="chat"
        className=" w-[85%] flex flex-col items-center my-12"
      >
        <TabsList className="w-full">
          <TabsTrigger value="chat" className="w-full">Chat</TabsTrigger>
          <TabsTrigger value="attendance" className="w-full">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="w-full">
          <ScrollArea className=" min-h-[26rem] max-h-[300px] md:max-h-[640px] flex-col-reverse flex w-full p-2 border-b border-t">
            {messages.map((message: any, index: number) =>
              username?.name !== message.username ? (
                <div key={index} className=" my-2 w-full flex ">
                  <div className="relative flex flex-row items-center gap-2 justify-start p-2 w-fit">
                    <div className="absolute w-8 h-8 top-2 left-2 bg-gray-300 rounded-full overflow-hidden justify-self-end">
                    </div>
                    <div className="w-full flex flex-col ml-10 border p-2 rounded-lg bg-teal-950">
                      <p className="font-semibold text-xs self-start text-teal-500">{message.username}</p>
                      <p className=" max-w-[20ch]">{message.message}</p>
                    </div>
                  </div>
                </div>
              ) :
                (
                  <div key={index} className=" my-2 justify-end w-full flex">
                    <div className=" relative flex flex-row items-center gap-2 justify-end p-2 w-fit ">
                      <div className="w-full flex flex-col mr-10 border p-2 rounded-lg bg-zinc-800">
                        <p className="font-semibold text-xs self-end text-zinc-500">{message.username}</p>
                        <p className=" max-w-[20ch]">{message.message}</p>
                      </div>
                      <div className=" absolute w-8 h-8 top-2 right-2 bg-gray-300 rounded-full overflow-hidden justify-self-end">
                        <Image src={username.image} className="object-cover" alt="avatar" width={32} height={32} />
                      </div>
                    </div>
                  </div>
                ))}
          </ScrollArea>
          <InputField />
        </TabsContent>
        <TabsContent value="attendance">Coming Soon.</TabsContent>
      </Tabs>
    </Card>
  );
}

export default ChatPanel