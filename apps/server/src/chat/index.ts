import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: string;
  id: string;
}

export const chatHandler = (socket: Socket) => {
  const createRoom = ({ roomId }:{ roomId: string}) => {
    if(!rooms[roomId]){
        rooms[roomId] = [];
    }
    console.log(`Creating room: ${roomId}`);
    socket.emit("room-created", roomId);
  };
  const joinChat = ({ roomId, id }: IRoomParams) => {
    if (rooms[roomId]) {
      console.log(`Joining room: ${roomId} ${id}`);
      rooms[roomId].push(id);

      socket.join(roomId);

      socket.to(roomId).emit("user-joined", { peerId: id });

      socket.to(roomId).emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    } else {
      socket.emit("room-not-found", roomId);
      console.log(`Room not found: ${roomId}`)
    }
    console.log(rooms);

    socket.on("disconnect", () => {
      leaveRoom({ roomId, id });
    });
  };

  const leaveRoom = ({ roomId, id }: IRoomParams) => {
    if(rooms[roomId]){
      rooms[roomId] = rooms[roomId].filter((id) => id !== id);
    }
    socket.to(roomId).emit("user-disconnected", id);
  };

  const message = ({ roomId, msg }: { roomId: string; msg: string }) => {
    socket.to(roomId).emit("message", {msg});
  };

  socket.on("message", message);
  socket.on("join-chat", joinChat);
  socket.on("create-room", createRoom);
};
