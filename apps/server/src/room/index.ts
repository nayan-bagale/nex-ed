import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
    roomId: string;
    peerId: string;
}

export const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = uuidv4();
        rooms[roomId] = [];
        socket.emit("room-created", roomId);
        console.log(`Creating room`);
    };
    const joinRoom = ({ roomId, peerId }: IRoomParams) => {
        if (rooms[roomId]) {
            console.log(`Joining room: ${roomId} ${peerId}`);
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.emit("user-joined", { peerId });
            console.log('user joined to roomId:' + roomId );
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId],
            });
        }

        socket.on("disconnect", () => {
            console.log(`Connection closed: ${peerId}`);
            leaveRoom({ roomId, peerId });
        });
    };

    const leaveRoom = ({ roomId, peerId }: IRoomParams) => {
        // rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
        socket.to(roomId).emit("user-disconnected", peerId);
    };

    socket.on("join-room", joinRoom);
    socket.on("create-room", createRoom);
};
