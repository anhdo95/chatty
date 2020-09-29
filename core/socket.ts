import io from 'socket.io-client'
import { User, Message } from '@/interfaces/chat'

const socket: SocketIOClient.Socket = io('/')

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
