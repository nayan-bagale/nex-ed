'use client'

import { useRoom } from '@/components/Liveclass_V1/ContextAPI/RoomContext/RoomContext'
import React from 'react'
import Clock from './Clock';

const MiddleData = () => {
    const { meeting } = useRoom();
    return (
        <>
            <p className=' text-sm md:text-base'>{meeting?.title}</p>
            <Clock/>
        </>
    )
}

export default MiddleData