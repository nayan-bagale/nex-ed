import React, { useEffect } from 'react'
import { useRoom } from '@/components/Liveclass/ContextAPI/RoomContext/RoomContext'

export const useSetUserData = (user:any) => {
    const {setUsername} = useRoom();
 useEffect(() => {
    setUsername(user);
 },[user])
}
