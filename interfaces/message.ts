import { User } from './user'

export interface MessagesRequest {
	conversationId: number
	limit: number
	offset: number
}

export interface Messages {
	items: Message[]
	totalItems: number
}

export interface Message {
	id: number
	user?: User
	content: string
	createdAt: Date
	updatedAt: Date
}
