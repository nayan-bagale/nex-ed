"use client";

import {
    addPeerAction,
    removePeerAction,
} from "./peerActions";
import { peerReducer } from "./peerReducer";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useReducer,
    useMemo
} from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const ChatContext = createContext<null | any>(null);

const WS = process.env.NEXT_PUBLIC_WS_URL!;
const ws = socketIOClient(WS + ':' + process.env.NEXT_PUBLIC_WS_PORT! as any);

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [msgs, setMsgs] = useState<string[]>([]);

    const [roomId, setRoomId] = useState<string>("");
    const [stream, setStream] = useState<MediaStream>();
    const [rtc, setRtc] = useState<Peer>();
    const [peers, dispatch] = useReducer(peerReducer, {});

    const [screenStream, setScreenStream] = useState<MediaStream>();
    const [screenSharingId, setScreenSharingId] = useState<string>('');

    const router = useRouter();
    const enterroom = (roomId: string) => {
        router.push(`/liveclass/${roomId}`);
        setRoomId(roomId);
    };

    const switchStream = (stream: MediaStream) => {
        setStream(stream);
        setScreenSharingId(rtc?.id || "");
        if(!rtc?.connections) return;
        Object.values(rtc?.connections).forEach((connection: any) => {
            const videoTrack: any = stream
                ?.getTracks()
                .find((track) => track.kind === "video");
            connection[0].peerConnection
                .getSenders()
                .find((sender: any) => sender.track.kind === "video")
                .replaceTrack(videoTrack)
                .catch((err: any) => console.error(err));
        });
    }

    const shareScreen = () => {
        if (screenSharingId) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then(switchStream);
        } else {
            navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
                switchStream(stream);
                setScreenStream(stream);
            });
        }
    }

    const removePeer = (peerId: string) => {
        dispatch(removePeerAction(peerId));
    };

    useEffect(() => {

        const uid = uuidv4();
        const rtcpeer = new Peer(uid, {
            path: "/peerjs",
            host: WS,
            port: 8080,
            // secure: true,
            debug: 3,
            
        });
        setRtc(rtcpeer);

        try {
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true,
                })
                .then((stream) => {
                    setStream(stream);
                });
        } catch (e) {
            console.log(e);
        }

        ws.on("room-created", enterroom);

        ws.on("message", ({ msg }) => {
            setMsgs((prev) => [...prev, msg]);
        });
        // ws.on('user-joined', (data: { roomId: string; id: string }) => {
        //     console.log(data)
        // })

        ws.on("get-users", (data) => {
            console.log(data);
        });
        ws.on("user-disconnected", removePeer);
        ws.on("user-started-sharing", (peerId:string) => setScreenSharingId(peerId));
        ws.on("user-stopped-sharing", () => setScreenSharingId(''));

        return () => {
            rtcpeer.disconnect();
            ws.off("room-created", enterroom);
            ws.off("message");
            ws.off("user-disconnected");
            ws.off("user-started-sharing");
            ws.off("user-stopped-sharing");
            // ws.off("user-joined");
            ws.off("get-users");
        };
    }, []);

    useEffect(() => {
        if (!rtc) return;
        if (!stream) return;

        ws.on("user-joined", ({ peerId }) => {
            const call = rtc.call(peerId, stream);
            call.on("stream", function (peerStream) {
                dispatch(addPeerAction(peerId, peerStream));
            });
            rtc.on('error', function (err) {
                console.log('Error occurred:', err);
            });

        });

        rtc.on("call", (call) => {
            call.answer(stream);
            console.log(call)

            call.on("stream", (peerStream) => {
                console.log(peerStream)
                dispatch(addPeerAction(call.peer, peerStream));
            });
        });

        return () => {
            ws.off("user-joined");
        };
    }, [stream, rtc]);

    useMemo(() => {
        if (screenSharingId) {
            ws.emit("start-sharing", { peerId: screenSharingId, roomId });
        } else {
            ws.emit("stop-sharing", { peerId: screenSharingId, roomId });
        }
    }, [screenSharingId, roomId]);

    useEffect(() => {
        ws.emit("join-room", { roomId, peerId: rtc?.id });
    }, [rtc?.id, roomId]);

    const sendMsg = (msg: string) => {
        if (roomId) {
            setMsgs((prev) => [...prev, msg]);
            ws.emit("message", { roomId, msg });
        }
    };

    console.log(peers)
    console.log({screenSharingId})

    return (
        <ChatContext.Provider
            value={{ msgs, sendMsg, setRoomId, roomId, ws, stream, peers, me: rtc?.id, shareScreen, screenStream, screenSharingId}}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);

export default ChatProvider;
