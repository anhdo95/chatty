import io from 'socket.io-client'
import { User, Message } from '@/interfaces/chat'

const socketOptions: SocketIOClient.ConnectOpts = {
	transportOptions: {
		polling: {
			extraHeaders: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpY2hhcmRAZ21haWwuY29tIiwic3ViIjoiNWY3ODNkZGE2MDQyY2MxN2ZjY2YwODkyIiwiaWF0IjoxNjAxNzMzNzc1LCJleHAiOjE2MzMyOTEzNzV9.r8bxsW10F82D08deuVocBRtCFJqu3uocw7MMWxUWrd8',
			},
		},
	},
}

const socket: SocketIOClient.Socket = io('localhost:8001', socketOptions)

console.log('socket access')

export interface ClientSocket {
	instance: SocketIOClient.Socket
	join(user: User): Promise<User>
	receiveMessage(callback: (message: Message) => void): void
	sendMessage(message: string): void
	unsubscribe(): void
}

const clientSocket: ClientSocket = {
	instance: socket,

	join(user: User): Promise<User> {
		return new Promise((resolve, reject) => {
			function handleError({ error, user }) {
				console.log('user11', user)
				if (error) return reject(error)
				resolve({
					...user,
					id: socket.id,
				})
			}

			socket.emit('join', user, handleError)
		})
	},

	receiveMessage(callback: (message: Message) => void): void {
		socket.on('message', callback)
	},

	sendMessage(message: string): void {
		socket.emit('sendMessage', message)
	},

	unsubscribe(): void {
		socket.off(null)
	},
}

export default clientSocket
