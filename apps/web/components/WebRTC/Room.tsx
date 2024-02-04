'use client'

import { RoomContext } from "@/components/WebRTC/ContextAPI/RoomContext";
import { PeerState } from "@/components/WebRTC/ContextAPI/peerReducer";
import VideoPlayer from "@/components/WebRTC/VideoPlayer";
import { useContext, useEffect } from "react";

const page = ({ roomid }: { roomid: string } ) => {
    const { ws, me, stream, peers } = useContext(RoomContext);
    console.log({ peers })
    useEffect(() => {
        if (me) ws.emit('join-room', { roomId: roomid, peerId: me._id })
    }, [roomid, ws, me])

    return (
        <div>
            <h1>{roomid}</h1>
            <h2>{me?._id}</h2>
            <div>
                <VideoPlayer stream={stream} />
                {Object.values(peers as PeerState).map((peer) => (
                    <VideoPlayer stream={peer.stream} />
                ))}
            </div>
        </div>
    );
}

export default page