import { useQuery } from '@tanstack/react-query'

import { productsApi } from '@/entities/products/products-api'

const PRODUCTS_KEY = 'products'

type Params = {
	name?: string
	category?: string
	offset?: number
	limit?: number
}

export function useProductsQuery({
	name = '',
	category = '',
	offset = 0,
	limit = 8
}: Params = {}) {
	return useQuery({
		queryKey: [PRODUCTS_KEY, { name, category, offset, limit }],
		queryFn: () => productsApi.getProducts({ name, category, offset, limit }),
		staleTime: 1000 * 60 * 15
	})
}
