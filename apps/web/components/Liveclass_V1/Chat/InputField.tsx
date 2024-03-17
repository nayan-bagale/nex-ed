"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useChat } from "../ContextAPI/ChatContext/ChatContext";
import { useRoom } from "../ContextAPI/RoomContext/RoomContext";
import { useState } from "react";


const InputField = () => {
 const { sendMessage } = useChat();
  const { roomId, username } = useRoom();
  const [message, setMessage] = useState<string>("");

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!message) return;
    sendMessage(message, roomId, username);
    setMessage("");
  }

  return (
    <form onSubmit={handlesubmit} className="flex flex-row items-center w-full mt-2 gap-2">
      <Input className="w-full" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button className=" px-2" variant='secondary'>
        <Send  />
      </Button>
    </form>
  );
};

export default InputField;
