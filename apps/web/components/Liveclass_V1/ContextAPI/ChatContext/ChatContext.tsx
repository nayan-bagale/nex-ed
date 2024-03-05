'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { ws } from "../WebSockets";
import { set } from "react-hook-form";
import { toast } from "sonner";


const ChatContext = createContext<null | any>(null);

const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [messages, setMessages] = useState<{
        message: string;
        username: string;
    }[]>([]);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const newMessage = (message: string, username: string) => {
        setMessages((prev) => [...prev, { message, username }]);
        if(!isOpen) {
            toast.success(message);
        }
    };
    

    const sendMessage = (message: string, roomId: string, username: string) => {
        ws.emit("message", { roomId, message, username });
        setMessages((prev) => [...prev, { message, username }]);
    };

    useEffect(() => {
       ws.on('message', ({ message, username }: { message: string, username: string }) => newMessage(message, username));
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