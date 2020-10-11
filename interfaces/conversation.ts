import { ConversationType } from '@/enums/conversation'
import { Message } from './message'

export interface ConversationsRequest {
	limit: number
	offset: number
}

export interface Conversations {
	items: Conversation[]
	totalItems: number
}

export class ConversationRequest {
	name: string
	userIds: number[]
	coverPhoto?: string
}

export interface Conversation {
	id: number
	name: string
	type: ConversationType
	coverPhoto: string
	lastMessage: Message
	createdAt: Date
	updatedAt: Date
}
