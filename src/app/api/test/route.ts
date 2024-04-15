import { NextResponse } from 'next/server'

import io from 'socket.io-client'
const socket = io('http://localhost:3001')

export async function POST(req, res): Promise<NextResponse> {
  try {
    // do something you need to do in the backend
    // (like database operations, etc.)

    socket.emit('message2', 'Sync Process Completed')

    return NextResponse.json({ data: 'Success' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error }, { status: 200 })
  }
}
// import WebSocket from 'ws'

// let wss // Declare wss outside of the handler function

// function initializeWebSocketServer(): void {
//   // Create a WebSocket server instance
//   wss = new WebSocket.Server({ noServer: true })

//   // Handle WebSocket connection
//   wss.on('connection', (ws) => {
//     console.log('WebSocket connected')

//     // Handle WebSocket messages
//     ws.on('message', (message) => {
//       console.log(`Received message: ${message}`)

//       // Echo the message back to the client
//       ws.send(`Echo: ${message}`)
//     })

//     // Handle WebSocket disconnection
//     ws.on('close', () => {
//       console.log('WebSocket disconnected')
//     })
//   })
// }

// initializeWebSocketServer() // Call the function to initialize the WebSocket server

// export default async function handler(req, res): Promise<any> {
//   if (req.method === 'GET') {
//     // Upgrade the HTTP request to WebSocket
//     wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
//       wss.emit('connection', ws, req)
//     })

//     return
//   }

//   res.status(405).end()
// }
