import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { Message, MessageRequest } from '@/shared/interfaces/message'
import { ConversationRequest } from '@/shared/interfaces/conversation'

export interface ClientSocket {
	socket: SocketIOClient.Socket
	init: () => void
	join(conversationId: number): Promise<ConversationRequest>
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
	},

	join(conversationId: number): Promise<ConversationRequest> {
		return new Promise(resolve => {
			function handleError(result: ConversationRequest) {
				console.log('join', result)
				resolve(result)
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
