'use client'
import { createContext, useContext, useEffect } from "react";
import { ws } from "../WebSockets";


const ChatContext = createContext<null | any>(null);

const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const sendMessage = (message: string, roomId: string, username: string) => {
        ws.emit("message", { roomId, message, username });
    };

    useEffect(() => {
       ws.on('message', ({ message, username }: { message: string, username: string }) => console.log({ message, username}));
    }, []);

    return (
        <ChatContext.Provider
            value={{
                sendMessage
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);

export default ChatProvider;