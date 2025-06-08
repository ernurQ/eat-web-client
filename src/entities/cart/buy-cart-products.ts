import { api } from '@/shared/api'

export async function buyCartProducts() {
	await api.post('/cart/initiate')
}
