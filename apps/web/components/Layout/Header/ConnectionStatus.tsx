'use client'

import { useEffect } from 'react'
import { Badge } from "@/components/ui/badge";
import { UnplugIcon, PlugZapIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useRecoilState } from 'recoil';
import socketIOClient from "socket.io-client";
import { connectionStatus } from "@/components/Store/connectionstatus"


const ConnectionStatus = () => {
    const [status, setConnectionStatus] = useRecoilState(connectionStatus);
    
    useEffect(() => {
        const ws = socketIOClient(process.env.NEXT_PUBLIC_WS_URL!);
        ws.on('connect', () => {
            setConnectionStatus(true)
        })
        ws.on('disconnect', () => {
            setConnectionStatus(false)
        })

        return () => {
            ws.off('connect')
            ws.off('disconnect')
            ws.disconnect()
        }
    }, [])

    return (
        status ? (
            <Badge>
                <UnplugIcon />
                {/* <span className=" animate-pulse absolute -right-3 bottom-0 flex w-3 h-3 me-3 bg-green-500 rounded-full"></span> */}
            </Badge>

        ) : (
            <Badge className=' animate-pulse' variant='destructive'><PlugZapIcon /></Badge>
        ));
}

export default ConnectionStatus