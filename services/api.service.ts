import axios from '@/core/axios'
import { RegisterRequest, RegisterResponse } from '@/interfaces/register'
import { LoginRequest, LoginResponse } from '@/interfaces/login'
import { User } from '@/interfaces/user'
import { ConversationsRequest, Conversations } from '@/interfaces/conversation'
import { Messages, MessagesRequest } from '@/interfaces/message'

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

	getRooms(params: ConversationsRequest): Promise<Conversations> {
		return axios.get(`/conversations`, { params })
	},

	getMessages(params: MessagesRequest): Promise<Messages> {
		return axios.get(`/messages`, { params })
	},
}
