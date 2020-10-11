import axios from '@/core/axios'
import { RegisterRequest, RegisterResponse } from '@/interfaces/register'
import { LoginRequest, LoginResponse } from '@/interfaces/login'
import { User } from '@/interfaces/user'

export default {
	register(request: RegisterRequest): Promise<RegisterResponse> {
		return axios.post(`/auth/register`, request)
	},

	login(request: LoginRequest): Promise<LoginResponse> {
		return axios.post(`/auth/login`, request)
	},

	getUserProfile(): Promise<User> {
		return axios.get(`/users/me`)
	},
}
