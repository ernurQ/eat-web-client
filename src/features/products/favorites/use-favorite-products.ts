import { useSearchParams } from 'next/navigation'

import { useFavoritesQuery } from '@/entities/products'

const FAVORITE_PRODUCTS_PAGE = 'page'

export function useFavoriteProducts() {
	const searchParams = useSearchParams()
	const currentPage = +(searchParams.get(FAVORITE_PRODUCTS_PAGE) || 1)

	const limit = 6
	const result = useFavoritesQuery({
		limit,
		offset: (currentPage - 1) * limit
	})

	return {
		...result,
		currentPage,
		hasNextPage: result.data && result.data.length >= limit
	}
}
