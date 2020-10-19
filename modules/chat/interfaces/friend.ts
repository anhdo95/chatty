import { User } from '@/shared/interfaces/user'
import { FriendStatus } from '@/modules/chat/enums/friend'

export interface FriendsRequest {
	limit: number
	offset: number
}

export interface Friends {
	items: Friend[]
	totalItems: number
}

export interface FriendRequest {
	toUserId: number
}

export interface Friend {
	id: number
	fromUserId: number
	fromUser: User
	toUserId: number
	toUser: User
	status: FriendStatus
	createdAt: Date
	updatedAt: Date
}
