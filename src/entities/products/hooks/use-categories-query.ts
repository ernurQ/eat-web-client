import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { productsApi } from '@/entities/products/products-api'

const CATEGORIES_KEY = 'categories'

export function useCategoriesQuery(
	options?: UndefinedInitialDataOptions<string[]>
) {
	return useQuery({
		...options,
		queryKey: [CATEGORIES_KEY],
		queryFn: () => productsApi.getCategories(),
		staleTime: 1000 * 60 * 60 * 2
	})
}
