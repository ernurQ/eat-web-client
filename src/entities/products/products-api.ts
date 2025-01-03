import { uniq } from 'lodash'

import { sleep } from '@/shared/lib/sleep'

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
	}
}
