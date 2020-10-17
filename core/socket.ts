import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { Message, MessageRequest } from '@/interfaces/message'
import { User } from '@/interfaces/user'

export interface ClientSocket {
	socket: SocketIOClient.Socket
	init: () => void
	join(conversationId: number): Promise<User>
	receiveMessage(callback: (message: Message) => void): void
	sendMessage(message: MessageRequest): void
	unsubscribe(): void
}

const clientSocket: ClientSocket = {
	socket: null,

	init() {
		const options: SocketIOClient.ConnectOpts = {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
				},
			},
		}

		this.socket = io('localhost:8001', options)
		console.log('this.socket', this.socket)
	},

	join(conversationId: number): Promise<User> {
		return new Promise((resolve, reject) => {
			function handleError(result) {
				resolve()
				console.log('user11', result)
				// if (error) return reject(error)
				// resolve({
				// 	...user,
				// 	id: socket.id,
				// })
			}

			this.socket.emit('join', conversationId, handleError)
		})
	},

	receiveMessage(callback: (message: Message) => void): void {
		this.socket.on('message', callback)
	},

	sendMessage(message: MessageRequest): void {
		this.socket.emit('sendMessage', message)
	},

	unsubscribe(): void {
		this.socket.off(null)
	},
}

export default clientSocket
