import axios from 'axios'

import { tokenService } from '@/shared/lib/token-service'

const baseURL = '/backend-api'

const api = axios.create({
	baseURL,
	withCredentials: true
})

api.interceptors.request.use((config) => {
	const token = tokenService.getAccessToken()
	config.headers.Authorization = `Bearer ${token}`
	return config
})

export { api }
