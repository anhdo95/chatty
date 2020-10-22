import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { Message, MessageRequest } from '@/modules/chat/interfaces/message'
import { ConversationRequest } from '@/modules/chat/interfaces/conversation'

export interface ClientSocket {
	socket: SocketIOClient.Socket
	joinnedConversationIds: number[]
	init: () => void
	join(conversationId: number): Promise<ConversationRequest>
	receiveMessage(callback: (message: Message) => void): void
	sendMessage(message: MessageRequest): void
	unsubscribe(): void
}

const clientSocket: ClientSocket = {
	socket: null,

	joinnedConversationIds: [],

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
			const handleError = (result: ConversationRequest) => {
				resolve(result)
			}

			if (!this.joinnedConversationIds.includes(conversationId)) {
				this.socket.emit('join', conversationId, handleError)
				this.joinnedConversationIds.push(conversationId)
			}
		})
	},

	receiveMessage(callback: (message: Message) => void): void {
		this.socket.on('message', callback)
	},

	sendMessage(message: MessageRequest): void {
		this.socket.emit('sendMessage', message)
	},

	unsubscribe(): void {
		this.socket.off()
	},
}

export default clientSocket
