import io from 'socket.io-client'

const socket = io(
  process.env.NEXT_PUBLIC_WS_SERVER_URL ?? 'http://localhost:3001'
)
export default socket
