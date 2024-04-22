'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input';
import { useRoom } from './ContextAPI/RoomContext/RoomContext';
import { useSetUserData } from './CustomHooks/useSetUserData';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

const CreateRoom = ({ user }: { user: any }) => {
    const [roomid, setRoomid] = useState<string>("")
    const router = useRouter();
    const { setRoomId } = useRoom();
    const createRoom = (roomid: string) => {
        setRoomId(roomid)
        router.push(`/liveclass/${roomid}`);

    }

    useSetUserData(user);

    return (
        <div className='flex flex-col gap-10 items-center justify-center h-screen'>
            <Card>
                <CardHeader> Enter Meeting Id </CardHeader>
                <CardContent>
                    <Input type="text" placeholder='Enter room id' className="" onChange={(e) => setRoomid(e.target.value)} />
                </CardContent>
                <CardFooter>
                    <Button variant="secondary" onClick={() => createRoom(roomid)}>Join Room</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CreateRoom