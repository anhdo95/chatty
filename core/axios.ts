import axios from 'axios'
import Cookies from 'js-cookie'
import { setError } from '@/store/actions'

const instance = axios.create({
	baseURL: process.env.BASE_URL,
})

instance.interceptors.request.use(config => {
	const token = Cookies.get('token')

	if (token) {
		config.params = config.params || {}
		config.headers.authorization = `Bearer ${token}`
	}

	return config
})

instance.interceptors.response.use(
	res => {
		if (res) {
			return res.data
		}

		return res
	},
	error => {
		globalThis.__store__.dispatch(setError(error.response.data))
		return Promise.reject(error)
	}
)

export default instance
