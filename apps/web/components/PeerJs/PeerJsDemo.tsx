'use client'

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';


function App() {
    const [peerId, setPeerId] = useState<string>('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const currentUserVideoRef = useRef<HTMLVideoElement>(null);
    const peerInstance = useRef<any>(null);

    useEffect(() => {
        const peer = new Peer();

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
                if (!remoteVideoRef.current) return
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play();
            });
        });
    }

    return (
        <div className="App">
            <h1>Current user id is {peerId}</h1>
            <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
            <button onClick={() => call(remotePeerIdValue)}>Call</button>
            <div>
                <video ref={currentUserVideoRef} />
            </div>
            <div>
                <video ref={remoteVideoRef} />
            </div>
        </div>
    );
}

export default App;