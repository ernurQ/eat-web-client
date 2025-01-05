import { useQuery } from '@tanstack/react-query'

import { queryClient } from '@/shared/api/query-client'
import { PaginationParams } from '@/shared/types/pagination.types'

import { productsApi } from '@/entities/products/api/products-api'

const FAVORITES_KEY = 'favorites'

export function useFavoritesQuery({
	offset = 0,
	limit = 6
}: PaginationParams = {}) {
	return useQuery({
		queryKey: [FAVORITES_KEY, { offset, limit }],
		queryFn: () => productsApi.getFavorites({ offset, limit }),
		staleTime: 1000 * 60 * 15
	})
}

export async function invalidateFavoritesQuery() {
	await queryClient.invalidateQueries({
		queryKey: [FAVORITES_KEY]
	})
}
