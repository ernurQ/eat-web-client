import { api } from '@/shared/api'

type Data = {
	productId: string
}

export async function deleteProduct({ productId }: Data) {
	await api.delete(`/products/${productId}`)
}
