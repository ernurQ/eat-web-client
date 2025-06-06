import { sleep } from '@/shared/lib/sleep'

import { CartProduct } from '@/entities/cart/types'
import { mockProducts } from '@/entities/products/mock-data'

export const cartApi = {
	getCartProducts: async (): Promise<CartProduct[]> => {
		await sleep(1000)

		if (typeof window === 'undefined') {
			return []
		}

		const cartString = localStorage.getItem('cart') || '[]'
		const cartItems = JSON.parse(cartString) as Array<{
			id: string
			quantity: number
		}>

		const cartProducts: CartProduct[] = cartItems
			.map(({ id, quantity }) => {
				const product = mockProducts.find((p) => p.id === id)
				if (!product) return null

				const cartProduct: CartProduct = {
					...product,
					quantity,
					maxQuantity: 100
				}
				return cartProduct
			})
			// Filter out any `null` in case a product was not found
			.filter((item): item is CartProduct => item !== null)
		console.log(cartProducts)
		return cartProducts
	},

	getCartTotalPrice: async (): Promise<number> => {
		await sleep(1200)

		const cartProducts = await cartApi.getCartProducts()

		// Sum up total based on the product’s current price and user’s quantity
		return cartProducts.reduce((acc, item) => {
			// If you want to account for discountedPrice:
			const actualPrice = item.discountPrice ?? item.price
			return acc + actualPrice * item.quantity
		}, 0)
	},

	setCartProductQuantity: async ({
		id,
		quantity
	}: {
		id: string
		quantity: number
	}) => {
		await sleep(1000)
		const product = mockProducts.find((product) => product.id === id)
		if (!product) throw Error('product not found')
		console.log('set cart product with id', id, 'quantity', quantity)
	},

	buyCartProducts: async () => {
		await sleep(1000)
		console.log('buy cart products')
	}
}
