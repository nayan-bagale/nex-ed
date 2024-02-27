"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHandler = void 0;
const rooms = {};
const chatHandler = (socket) => {
    const createRoom = ({ roomId }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }
        console.log(`Creating room: ${roomId}`);
        socket.emit("room-created", roomId);
    };
    const joinRoom = ({ roomId, peerId }) => {
        console.log(peerId);
        if (rooms[roomId]) {
            console.log(`Joining room: ${roomId} ${peerId}`);
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.to(roomId).emit("user-joined", { peerId: peerId });
            socket.to(roomId).emit("get-users", {
                roomId,
                participants: rooms[roomId],
            });
        }
        else {
            socket.emit("room-not-found", roomId);
            console.log(`Room not found: ${roomId}`);
        }
        console.log(rooms);
        socket.on("disconnect", () => {
            leaveRoom({ roomId, peerId });
        });
    };
    const leaveRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
        }
        socket.to(roomId).emit("user-disconnected", peerId);
    };
    const message = ({ roomId, msg }) => {
        socket.to(roomId).emit("message", { msg });
    };
    const startSharing = ({ roomId, peerId }) => {
        socket.to(roomId).emit("user-started-sharing", peerId);
    };
    const stopSharing = ({ roomId, peerId }) => {
        socket.to(roomId).emit("user-stopped-sharing", peerId);
    };
    socket.on("message", message);
    socket.on("join-room", joinRoom);
    socket.on("create-room", createRoom);
    socket.on("start-sharing", startSharing);
    socket.on("stop-sharing", stopSharing);
};
exports.chatHandler = chatHandler;
