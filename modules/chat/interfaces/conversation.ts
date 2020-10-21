import { ConversationType } from '@/modules/chat/enums/conversation'
import { Message } from './message'
import { User } from '@/shared/interfaces/user'

export interface ConversationsRequest {
	limit: number
	offset: number
}

export interface Conversations {
	items: Conversation[]
	totalItems: number
}

export interface ConversationRequest {
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
	users: User[]
	createdAt: Date
	updatedAt: Date
}
