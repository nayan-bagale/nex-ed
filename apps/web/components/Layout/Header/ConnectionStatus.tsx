'use client'

import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge";
import { UnplugIcon, PlugZapIcon } from 'lucide-react';
import { ws } from '@/components/Liveclass_V1/ContextAPI/Connection_WS_Peerjs';
import { toast } from 'sonner';


const ConnectionStatus = () => {
    const [connectionStatus, setConnectionStatus] = useState(false)
    
    useEffect(() => {
        ws.on('connect', () => {
            setConnectionStatus(true)
        })
        ws.on('disconnect', () => {
            setConnectionStatus(false)
        })
        return () => {
            ws.off('connect')
            ws.off('disconnect')
        }
    }, [])

    useEffect(() => {
        if(connectionStatus) {
            toast.success('Connected to server')
        } else {
            toast.error('Disconnected from server')
        }

    }, [connectionStatus])

  return (
    connectionStatus ? (
          <Badge>
            <UnplugIcon />
              {/* <span className=" animate-pulse absolute -right-3 bottom-0 flex w-3 h-3 me-3 bg-green-500 rounded-full"></span> */}
          </Badge>
          
      ) : (
              <Badge className=' animate-pulse' variant='destructive'><PlugZapIcon/></Badge>
    ));
}

export default ConnectionStatus