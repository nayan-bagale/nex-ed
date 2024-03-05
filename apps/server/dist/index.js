"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const chat_1 = require("./chat");
const peer_1 = require("peer");
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(cors_1.default);
const server = http_1.default.createServer(app);
const peerServer = (0, peer_1.ExpressPeerServer)(server, {
    proxied: true,
    path: '/peerjs'
});
app.use('/', peerServer);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    // roomHandler(socket)
    (0, chat_1.chatHandler)(socket);
    socket.on('disconnect', () => {
        console.log(`Connection closed: ${socket.id}`);
    });
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
