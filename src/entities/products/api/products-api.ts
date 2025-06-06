import { sleep } from '@/shared/lib/sleep'
import { PaginationParams } from '@/shared/types/pagination.types'

import { mockProducts } from '@/entities/products/mock-data'
import type { Product } from '@/entities/products/product-types'

export const productsApi = {
	getFavorites: async ({
		offset = 0,
		limit = 8
	}: PaginationParams = {}): Promise<Product[]> => {
		await sleep(1000)
		return mockProducts
			.filter((product) => product.isFavorite)
			.slice(offset, offset + limit)
	},

	addFavorite: async ({ id }: { id: string }) => {
		await sleep(500)
		const productIndex = mockProducts.findIndex((product) => product.id === id)
		if (productIndex === -1) throw Error('not found')
		const isFavorite = mockProducts[productIndex].isFavorite
		mockProducts[productIndex].isFavorite = !isFavorite
		console.log(mockProducts[productIndex])
	}
}
