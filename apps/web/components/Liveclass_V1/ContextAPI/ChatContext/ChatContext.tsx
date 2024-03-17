'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { ws } from "../Connection_WS_Peerjs";
import { toast } from "sonner";
import { IProfile } from "@/types/profile";


const ChatContext = createContext<null | any>(null);

const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [messages, setMessages] = useState<{
        message: string;
        username: IProfile;
    }[]>([]);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const newMessage = (message: string, username: IProfile) => {
        setMessages((prev) => [...prev, { message, username }]);
        if(!isOpen) {
            toast.success(message);
        }
    };
    

    const sendMessage = (message: string, roomId: string, username: IProfile) => {
        ws.emit("message", { roomId, message, profile: username });
        setMessages((prev) => [...prev, { message, username }]);
    };

    useEffect(() => {
        ws.on('message', ({ message, username }: { message: string, username: IProfile }) => newMessage(message, username));
    }, []);

    return (
        <ChatContext.Provider
            value={{
                sendMessage,
                messages,
                isOpen, 
                setIsOpen
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);

export default ChatProvider;