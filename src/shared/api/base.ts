import axios from 'axios'

import { tokenService } from '@/shared/lib/token-service'

export const backendUrl = 'http://localhost/api'
const baseURL = 'https://api.eatweb.food/api'

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
