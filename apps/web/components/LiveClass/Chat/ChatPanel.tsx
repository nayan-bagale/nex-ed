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


const ChatPanel = () => {
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
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
          </ScrollArea>
          <InputField />
        </TabsContent>
        <TabsContent value="attendance">Coming Soon.</TabsContent>
      </Tabs>
    </Card>
  );
}

export default ChatPanel