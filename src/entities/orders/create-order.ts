import { api } from '@/shared/api'

export async function createOrder() {
	await api.post('/cart/createOrder')
}
