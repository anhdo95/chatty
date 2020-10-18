import axios from '@/core/axios'
import { RegisterRequest, RegisterResponse } from '@/modules/auth/interfaces/register'
import { LoginRequest, LoginResponse } from '@/modules/auth/interfaces/login'
import { User, UsersRequest, Users } from '@/shared/interfaces/user'
import { ConversationsRequest, Conversations } from '@/modules/chat/interfaces/conversation'
import { Messages, MessagesRequest } from '@/modules/chat/interfaces/message'
import { FriendRequest, Friend } from '@/modules/chat/interfaces/friend'

export default {
	register(data: RegisterRequest): Promise<RegisterResponse> {
		return axios.post(`/auth/register`, data)
	},

	login(data: LoginRequest): Promise<LoginResponse> {
		return axios.post(`/auth/login`, data)
	},

	getUserProfile(): Promise<User> {
		return axios.get(`/users/me`)
	},

	getUnfriendedUsers(params: UsersRequest): Promise<Users> {
		return axios.get(`/users/unfriended`, { params })
	},

	getRooms(params: ConversationsRequest): Promise<Conversations> {
		return axios.get(`/conversations`, { params })
	},

	getMessages(params: MessagesRequest): Promise<Messages> {
		return axios.get(`/messages`, { params })
	},

	addFriend(data: FriendRequest): Promise<Friend> {
		return axios.post(`/friends`, data)
	},
}
