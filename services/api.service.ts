import axios from '@/core/axios'
import { RegisterRequest, RegisterResponse } from '@/interfaces/register'

export default {
	register(request: RegisterRequest): Promise<RegisterResponse> {
		return axios.post(`/auth/register`, request)
	},
}
