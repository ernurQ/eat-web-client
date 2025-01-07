import { sleep } from '@/shared/lib/sleep'

import { mockCartProducts } from '@/entities/cart/mock-data'
import { CartProduct } from '@/entities/cart/types'

export const cartApi = {
	getCartProducts: async (): Promise<CartProduct[]> => {
		await sleep(1000)
		return mockCartProducts
	},

	getCartTotalPrice: async (): Promise<number> => {
		await sleep(1200)
		return mockCartProducts.reduce(
			(total, { price, quantity }) => total + price * quantity,
			0
		)
	},

	setCartProductQuantity: async ({
		id,
		quantity
	}: {
		id: string
		quantity: number
	}) => {
		await sleep(1000)
		const product = mockCartProducts.find((product) => product.id === id)
		if (!product) throw Error('product not found')
		product.quantity = quantity
		console.log('set cart product with id', id, 'quantity', quantity)
	},

	buyCartProducts: async () => {
		await sleep(1000)
		console.log('buy cart products')
	}
}
