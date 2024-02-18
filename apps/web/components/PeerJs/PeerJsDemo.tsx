'use client'

import { useEffect, useReducer, useRef, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import Peer from 'peerjs';
import { PeerState, peerReducer } from '../WebRTC/ContextAPI/peerReducer';
import { addPeerAction } from '../WebRTC/ContextAPI/peerActions';
import VideoPlayer from '../WebRTC/VideoPlayer';


function App() {
    const [peerId, setPeerId] = useState<string>('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const currentUserVideoRef = useRef<HTMLVideoElement>(null);
    const [peers, dispatch] = useReducer(peerReducer, {});
    const peerInstance = useRef<any>(null);

    useEffect(() => {
        const meId = uuidv4();
        const peer = new Peer(meId, {
            host: "localhost",
            port: 9000,
            path: "/myapp",
            debug: 3,
        });

        peer.on('open', (id) => {
            setPeerId(id)
        });

        peer.on('call', (call) => {
            var getUserMedia:any = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            
            getUserMedia({ video: true, audio: true }, (mediaStream: MediaStream) => {
                if (!currentUserVideoRef.current) return

                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                call.answer(mediaStream)
                call.on('stream', function (remoteStream) {
                    dispatch(addPeerAction(call.peer, remoteStream))
                    if (!remoteVideoRef.current) return
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                });
            });
        })

        peerInstance.current = peer;
    }, [])

    const call = (remotePeerId: string) => {
        var getUserMedia:any = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        getUserMedia({ video: true, audio: true }, (mediaStream: MediaStream) => {
            if (!currentUserVideoRef.current) return
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();

            const call = peerInstance.current.call(remotePeerId, mediaStream)

            call.on('stream', (remoteStream: MediaStream) => {
                dispatch(addPeerAction(call.peer, remoteStream))
                console.log(remoteStream)
                if (!remoteVideoRef.current) return
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play();
            });
        });
    }

    console.log(peers)

    return (
        <div className="App">
            <h1>Current user id is {peerId}</h1>
            <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
            <button onClick={() => call(remotePeerIdValue)}>Call</button>
            <div>
                <video ref={currentUserVideoRef} />
            </div>
            <div>
                {Object.values(peers as PeerState).map((peer) => (
                    <VideoPlayer stream={peer.stream} />
                ))}
            </div>
        </div>
    );
}

export default App;
