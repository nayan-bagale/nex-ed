'use client'
import { useContext, useEffect } from 'react'
import { Button } from '../ui/button'
import { RoomContext } from './ContextAPI/RoomContext'


const RTC = () => {
    const { ws } = useContext(RoomContext)
    const createRoom = () => {
        ws.emit('create-room')
    }
  return (
    <div className='flex items-center justify-center h-screen'>
        <Button variant="outline"
              onClick={createRoom}
        >Start new meeting</Button>
    </div>
  )
}

export default RTC