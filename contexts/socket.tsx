import { createContext, useContext } from 'react'
import socket, { ClientSocket } from '@/core/socket'

const SocketContext = createContext(socket)

export function useSocket(): ClientSocket {
	return useContext(SocketContext)
}
