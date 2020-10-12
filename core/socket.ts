import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { User } from '@/interfaces/chat'
import { Message, MessageRequest } from '@/interfaces/message'

// const socketOptions: SocketIOClient.ConnectOpts = {
// 	transportOptions: {
// 		polling: {
// 			extraHeaders: {
// 				Authorization:
// 					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6NiwiaWF0IjoxNjAyNTEyMzg2LCJleHAiOjE2MzQwNjk5ODZ9.EcpDv-VUslsCN_M9j7s98RBFONpChDO6jZb2DuITPM0',
// 			},
// 		},
// 	},
// }

// const socket: SocketIOClient.Socket = io('localhost:8001', socketOptions)

// console.log('socket access')

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
