import { queryOptions } from '@tanstack/react-query'

import { api, backendUrl, queryClient } from '@/shared/api'

type ResponseData = {
	items: Array<{
		product: {
			id: string
			name: string
			thumbnail: Array<string> | null
			price: number
			discountPrice: number
			quantity: number
		}
		quantity: number
	}>
	totalPrice: number
	totalPriceWithDiscount: number
	totalQuantity: number
}

export function getCartOptions() {
	return queryOptions({
		queryKey: ['cart'],
		queryFn: async () => {
			const res = await api.get<ResponseData>('/cart')

			return {
				products: res.data.items.map(
					({ product, quantity: quantityInCart }) => ({
						...product,
						quantityInCart,
						thumbnail: `${backendUrl}/api/products/images/${(product.thumbnail?.at(-1) || '').split('/').slice(1).join('/')}`,
						totalPrice: quantityInCart * product.discountPrice
					})
				),
				totalPrice: res.data.totalPrice,
				totalPriceWithDiscount: res.data.totalPriceWithDiscount,
				totalQuantity: res.data.totalQuantity
			}
		}
	})
}

export async function invalidateGetCartQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['cart']
	})
}
