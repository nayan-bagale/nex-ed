'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input';
import { ws } from './ContextAPI/Connection_WS_Peerjs';
import { useRoom } from './ContextAPI/RoomContext/RoomContext';
import { useSetUserData } from './CustomHooks/useSetUserData';

const CreateRoom = ({ user }: { user: any }) => {
    const [roomid, setRoomid] = useState<string>("")
    const createRoom = (roomid: string) => {
        ws.emit('create-room', {
            roomId: roomid,
        })
    }

    useSetUserData(user);

    const uid = crypto.randomUUID().slice(0, 8);

    return (
        <div className='flex flex-col gap-10 items-center justify-center h-screen'>
            <h1>{user?.name}</h1>
            <Button variant="secondary"
                onClick={() => createRoom(uid)}
            >
                Create new room
            </Button>
            <div className='flex gap-4'>
                <Input type="text" placeholder='Enter room id' className="w-80" onChange={(e) => setRoomid(e.target.value)} />
                <Button variant="secondary" onClick={() => createRoom(roomid)}>Join Room</Button>
            </div>
        </div>
    )
}

export default CreateRoom