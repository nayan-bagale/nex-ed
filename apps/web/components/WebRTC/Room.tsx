'use client'

import { RoomContext } from "@/components/WebRTC/ContextAPI/RoomContext";
import { PeerState } from "@/components/WebRTC/ContextAPI/peerReducer";
import VideoPlayer from "@/components/WebRTC/VideoPlayer";
import { useContext, useEffect, useState } from "react";

const page = ({ roomid }: { roomid: string } ) => {
    const { ws, me, stream, peers, call } = useContext(RoomContext);
    const [peerId, setPeerId] = useState<string>('')
    useEffect(() => {
        if (me) ws.emit('join-room', { roomId: roomid, peerId: me._id })
    }, [roomid, ws, me])

    return (
        <div>
            <h1>{roomid}</h1>
            <h2>{me?._id}</h2>
            <div>

            <input type="text" onChange={(e) => setPeerId(e.target.value)} />
            <button onClick={() => call({ peerId })}>Call</button>
            </div>
            <div>
                <VideoPlayer stream={stream} />
                {Object.values(peers as PeerState).map((peer) => (
                    <VideoPlayer key={peer.stream.id} stream={peer.stream} />
                ))}
            </div>
        </div>
    );
}

export default page