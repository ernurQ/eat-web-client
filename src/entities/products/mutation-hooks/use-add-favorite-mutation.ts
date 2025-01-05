import { useMutation } from '@tanstack/react-query'

import { productsApi } from '@/entities/products/api/products-api'
import { invalidateFavoritesQuery } from '@/entities/products/query-hooks/use-favorites-query'

export function useAddFavoriteMutation() {
	return useMutation({
		mutationFn: (id: string) => productsApi.addFavorite({ id }),
		onSuccess: () => invalidateFavoritesQuery()
	})
}
