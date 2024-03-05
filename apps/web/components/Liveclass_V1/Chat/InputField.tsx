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

  const handleclick = () => {
    sendMessage(message, roomId, username?.name);
    setMessage("");
  };

  return (
    <div className="flex flex-row items-center w-full mt-2 gap-2">
      <Input className="w-full" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button className=" px-2" variant='secondary' onClick={handleclick}>
        <Send  />
      </Button>
    </div>
  );
};

export default InputField;
