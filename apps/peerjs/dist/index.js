"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const peer_1 = require("peer");
const peerServer = (0, peer_1.PeerServer)({ port: 9000, path: "/myapp" });
