"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useChat } from "./ContextAPI/RoomContext/ChatContext";
import VideoPlayer from "../WebRTC/VideoPlayer";
import { PeerState } from "../WebRTC/ContextAPI/peerReducer";

const Chatting = ({ roomid }: { roomid: string }) => {
    const { msgs, sendMsg, me, stream, peers } = useChat();

    const [msg, setMsg] = useState<string>("")

    const handleClick = () => {
        setMsg("");
        sendMsg(msg);
    }

    return (
        <div className=" flex flex-col mt-40 gap-8 items-center justify-center">
            <div>Chatting</div>
            <div>RoomId: {roomid}</div>
            <div>MyId: {me}</div>
            <Input className=" w-80" type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
            <Button variant="secondary" onClick={handleClick}>Send</Button>

            <ul className="flex flex-col gap-2">
                {msgs.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <VideoPlayer stream={stream} />

            <div className=" flex gap-2">
                {Object.values(peers as PeerState).map((peer) => (
                    <VideoPlayer stream={peer.stream} />
                ))}
            </div>
        </div>
    );
};

export default Chatting;
