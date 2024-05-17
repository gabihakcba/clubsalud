/**
 * Add this line on package.json to run server
 * "dev": "node server.js & next dev",
 */

const express = require('express')
const http = require('http')
const { Server: SocketIOServer } = require('socket.io')
const app = express()

const httpServer = http.createServer(app)

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://clubsalud.vercel.app',
      'https://www.centromedicomedintt.com'
    ],
    methods: ['GET', 'POST']
  }
})

let socket // Define a variable to hold the WebSocket instance

io.on('connection', (socketInstance) => {
  console.log('Client connected')

  // Store the WebSocket instance
  socket = socketInstance

  socket.on('notification', (data) => {
    console.log('Received from API ::', data)
    io.emit('notification', data)
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
