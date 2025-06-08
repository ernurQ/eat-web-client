import { api } from '@/shared/api'

type Data = {
	productId: string
}

export async function deleteProductFromCart({ productId }: Data) {
	await api.delete(`/cart/${productId}`)
}
