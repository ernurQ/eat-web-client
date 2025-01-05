import { uniq } from 'lodash'

import { sleep } from '@/shared/lib/sleep'
import { PaginationParams } from '@/shared/types/pagination.types'

import { mockProducts } from '@/entities/products/mock-data'
import type { GetProducts, Product } from '@/entities/products/product-types'

export const productsApi = {
	getProducts: async ({
		name = '',
		category = '',
		offset = 0,
		limit = 8
	}: GetProducts = {}): Promise<Product[]> => {
		await sleep(1000)
		return mockProducts
			.filter((product) =>
				product.name.toLowerCase().includes(name?.toLowerCase())
			)
			.filter((product) =>
				product.category.toLowerCase().includes(category?.toLowerCase())
			)
			.slice(offset, offset + limit)
	},

	getCategories: async (): Promise<string[]> => {
		await sleep(700)
		const categories = mockProducts.map((product) => product.category)
		return uniq(categories)
	},

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
