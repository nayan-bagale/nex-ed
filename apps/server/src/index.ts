import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { roomHandler } from './room'

const port = 8080
const app = express()
app.use(cors)
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`)
    roomHandler(socket)
    socket.on('disconnect', () => {
        console.log(`Connection closed: ${socket.id}`)
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})