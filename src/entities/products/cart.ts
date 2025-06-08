import { api } from '@/shared/api'

export function addToCartOptions() {
	return {
		mutationFn: async (item: { productId: string; quantity: number }) => {
			await api.post('/cart', item)
		}
	}
}
