import express from "express"
import cors from "cors"
import { Server } from "socket.io"
import { createServer } from "http"
import { clerkMiddleware } from '@clerk/express'
import { route as recommendRouter } from "../routes/recommend.routes.js"
import "dotenv/config"

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(clerkMiddleware())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


// API Routes configuration
app.get("/", (req, res) => {
    return res.json({ message: "hello from server" })
})
app.use("/api/v1/user-query", recommendRouter)





io.on("connection", (socket) => {
    io.to(socket.id).emit('get_socketId', { socketId: socket.id })
})

export default server;