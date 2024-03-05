"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const uuid_1 = require("uuid");
const rooms = {};
const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = (0, uuid_1.v4)();
        rooms[roomId] = [];
        socket.emit("room-created", roomId);
        console.log(`Creating room`);
    };
    const joinRoom = ({ roomId, peerId, username }) => {
        if (rooms[roomId]) {
            console.log(`Joining room: ${roomId} ${peerId} ${username}`);
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.emit("user-joined", { peerId, username });
            console.log('user joined to roomId:' + roomId);
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
    const leaveRoom = ({ roomId, peerId }) => {
        // rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
        socket.to(roomId).emit("user-disconnected", peerId);
    };
    socket.on("join-room", joinRoom);
    socket.on("create-room", createRoom);
};
exports.roomHandler = roomHandler;
