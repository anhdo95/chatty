import axios from 'axios'
import Cookies from 'js-cookie'
import { setError } from '@/store/actions'

const instance = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use(config => {
	if (Cookies.get('token')) {
		config.params = config.params || {}
		config.params.auth = Cookies.get('token')
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
		return error
	}
)

export default instance
