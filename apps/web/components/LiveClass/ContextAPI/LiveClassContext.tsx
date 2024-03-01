import React from 'react'
import RoomContext from './RoomContext/RoomContext'
import ChatContext from './ChatContext/ChatContext';

interface LiveClassContextProps {
    children: React.ReactNode;
}


const LiveClassContext: React.FC<LiveClassContextProps> = ({ children }) => {
    return (
        <RoomContext>
            <ChatContext>
                {children}
            </ChatContext>
        </RoomContext>
    )
}

export default LiveClassContext