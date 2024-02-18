"use client";

import {
    addPeerAction,
    removePeerAction,
} from "@/components/WebRTC/ContextAPI/peerActions";
import { peerReducer } from "@/components/WebRTC/ContextAPI/peerReducer";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useReducer,
    useRef,
} from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const ChatContext = createContext<null | any>(null);

const WS = "http://localhost:8080";
const ws = socketIOClient(WS);

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [msgs, setMsgs] = useState<string[]>([]);

    const [roomId, setRoomId] = useState<string>("");
    const [stream, setStream] = useState<MediaStream>();
    const [rtc, setRtc] = useState<Peer>();
    const [peers, dispatch] = useReducer(peerReducer, {});

    const norender = useRef(false);

    const router = useRouter();
    const enterroom = (roomId: string) => {
        router.push(`/liveclass/${roomId}`);
        setRoomId(roomId);
    };

    const removePeer = (peerId: string) => {
        dispatch(removePeerAction(peerId));
    };

    useEffect(() => {

        if (norender.current) return;
        norender.current = true;
        const uid = uuidv4();
        const rtcpeer = new Peer(uid, {
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

        return () => {
            rtcpeer.disconnect();
            ws.off("room-created", enterroom);
            ws.off("message");
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

    useEffect(() => {
        ws.emit("join-chat", { roomId, id: rtc?.id });
    }, [rtc?.id, roomId]);

    const sendMsg = (msg: string) => {
        if (roomId) {
            setMsgs((prev) => [...prev, msg]);
            ws.emit("message", { roomId, msg });
        }
    };

    console.log(peers)

    return (
        <ChatContext.Provider
            value={{ msgs, sendMsg, setRoomId,roomId, ws, stream, peers, me: rtc?.id }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);

export default ChatProvider;
