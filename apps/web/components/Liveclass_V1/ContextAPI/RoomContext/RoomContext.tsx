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

import { rtcpeer, ws } from "../Connection_WS_Peerjs";
import { schedule_meetingT } from "@/database/schema";

const RoomContext = createContext<null | any>(null);

const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [username, setUsername] = useState<any>({});

    const [meeting, setMeeting] = useState<schedule_meetingT>();

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

    const removePeer = (peerId: string) => {
        dispatch(removePeerAction(peerId));
    };

    useEffect(() => {
        const rtc = rtcpeer();
        setRtc(rtc);
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

        // ws.on('user-joined', (data: { roomId: string; id: string }) => {
        //     console.log(data)
        // })

        ws.on("get-users", (data) => {
            console.log(data);
        });
        ws.on("user-disconnected", removePeer);
        ws.on("user-started-sharing", (peerId: string) => setScreenSharingId(peerId));
        ws.on("user-stopped-sharing", () => setScreenSharingId(''));

        return () => {
            rtc.disconnect();
            ws.off("room-created", enterroom);
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
        ws.emit("join-room", { roomId, peerId: rtc?.id, profile: username });
        console.log({ roomId, peerId: rtc?.id, profile: username })
    }, [rtc?.id, roomId, username.name]);

    // Above functions are used to share screen, mute, pause, leave room, etc.
    const mute = () => {
        stream?.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    };

    const pause = () => {
        stream?.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    };

    const shareScreen = () => {
        const switchStream = (stream: MediaStream) => {
            setStream(stream);
            setScreenSharingId(rtc?.id || "");
            if (!rtc?.connections) return;
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

        if (screenSharingId) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    switchStream(stream);
                    setScreenSharingId("");
                    
                });
            return false;
            
        } else {
            navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
                switchStream(stream);
                setScreenStream(stream);
                stream.getVideoTracks()[0].onended = () => {
                    navigator.mediaDevices
                        .getUserMedia({ video: true, audio: true })
                        .then((stream) => {
                            switchStream(stream);
                            setScreenSharingId("");
                        });
                }
            });

            return true;
        }
    };

    const leaveRoom = () => {
        ws.disconnect();
        setStream(undefined);
        setRtc(undefined);
        setScreenSharingId("");
        setRoomId("");
        setUsername({});
        router.back();
    };


    console.log(peers)
    // console.log({ screenSharingId })

    return (
        <RoomContext.Provider
            value={{
                setMeeting,
                meeting,
                setUsername,
                username,
                setRoomId,
                roomId,
                stream,
                peers,
                me: rtc?.id,
                shareScreen,
                screenStream,
                screenSharingId,
                leaveRoom,
                mute,
                pause
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

export const useRoom = () => useContext(RoomContext);

export default RoomProvider;
