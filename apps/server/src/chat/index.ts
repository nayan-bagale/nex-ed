import { Socket } from "socket.io";
import { IProfile } from "../types/profile";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: string;
  peerId: string;
  profile?: IProfile;
}

export const chatHandler = (socket: Socket) => {
  const createRoom = ({ roomId }:{ roomId: string}) => {
    if(!rooms[roomId]){
        rooms[roomId] = [];
    }
    console.log(`Creating room: ${roomId}`);
    socket.emit("room-created", roomId);
  };
  const joinRoom = ({ roomId, peerId, profile }: IRoomParams) => {
    // console.log(profile);
    if (Object.hasOwn(rooms, roomId)) {
      console.log(`Joining room: ${roomId} ${peerId} ${profile?.name}`);
      rooms[roomId].push(peerId);

      socket.join(roomId);

      socket.to(roomId).emit("user-joined", { peerId: peerId });

      socket.to(roomId).emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    } else {
      socket.emit("room-not-found", roomId);
      console.log(`Room not found: ${roomId}`);
      console.log(rooms)
    }

    socket.on("disconnect", () => {
      leaveRoom({ roomId, peerId });
    });
  };

  const leaveRoom = ({ roomId, peerId }: IRoomParams) => {
    Object.keys(rooms).forEach((room) => {
      if(rooms[room].length === 0){
        delete rooms[room];
      }
    });

    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
    }
    socket.to(roomId).emit("user-disconnected", peerId);
  };

  const message = ({
    roomId,
    message,
    profile,
  }: {
    roomId: string;
    message: string;
    profile: IProfile;
  }) => {
    socket.to(roomId).emit("message", { message, username: profile });
  };

  const startSharing = ({ roomId, peerId }: IRoomParams) => {
    socket.to(roomId).emit("user-started-sharing", peerId);
  };

  const stopSharing = ({ roomId, peerId }: IRoomParams) => {
    socket.to(roomId).emit("user-stopped-sharing", peerId);
  };

  socket.on("message", message);
  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
  socket.on("start-sharing", startSharing);
  socket.on("stop-sharing", stopSharing);
};
