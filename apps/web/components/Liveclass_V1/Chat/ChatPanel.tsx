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


const ChatPanel = () => {
  const {messages} = useChat();
  const {username} = useRoom();
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
          <ScrollArea className=" h-[26rem] w-full p-2 border-b border-t">
            {messages.map((message:any, index:number) => 
              username?.name !== message.username ? (
              <div key={index} className=" my-2 flex flex-row items-center gap-2 justify-start ">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">{message.username}</p>
                  <p>{message.message}</p>
                </div>
              </div>
            ) :
            (
              <div key={index} className=" my-2 flex flex-row items-center gap-2 justify-end ">
                <div>
                  <p className="font-semibold text-sm">{message.username}</p>
                  <p>{message.message}</p>
                </div>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
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