import { User } from './user'
import { Conversation } from './conversation'

export interface MessagesRequest {
	conversationId: number
	limit: number
	offset: number
}

export interface MessageRequest {
	conversationId: number
	content: string
}

export interface Messages {
	items: Message[]
	totalItems: number
}

export interface Message {
	id: number
	conversationId: number
	conversation?: Conversation
	user?: User
	content: string
	createdAt: Date
	updatedAt: Date
}
