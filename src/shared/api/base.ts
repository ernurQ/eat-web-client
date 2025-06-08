import axios from 'axios'

import { tokenService } from '@/shared/lib/token-service'

export const backendUrl = 'http://67.207.69.179'
const baseURL = '/api'

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
