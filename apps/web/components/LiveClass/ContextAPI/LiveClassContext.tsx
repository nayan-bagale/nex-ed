import React from 'react'
import ChatProvider from './RoomContext/ChatContext'

interface LiveClassContextProps {
    children: React.ReactNode;
}


const LiveClassContext: React.FC<LiveClassContextProps> = ({ children }) => {
    return (
        <ChatProvider>
            {children}
        </ChatProvider>
    )
}

export default LiveClassContext