import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { roomHandler } from './room'
import { chatHandler } from './chat'
import { ExpressPeerServer } from "peer";


const port = process.env.PORT || 8080;
const app = express()
app.use(cors)
const server = http.createServer(app)

const peerServer = ExpressPeerServer(server, {
    proxied: true,
    path:'/peerjs'
})

app.use('/', peerServer)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`)
    // roomHandler(socket)
    chatHandler(socket)
    socket.on('disconnect', () => {
        console.log(`Connection closed: ${socket.id}`)
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})