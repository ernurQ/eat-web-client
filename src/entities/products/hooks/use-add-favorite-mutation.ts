import { useMutation } from '@tanstack/react-query'

import { invalidateFavoritesQuery } from '@/entities/products/hooks/use-favorites-query'
import { productsApi } from '@/entities/products/products-api'

export function useAddFavoriteMutation() {
	return useMutation({
		mutationFn: (id: string) => productsApi.addFavorite({ id }),
		onSuccess: () => invalidateFavoritesQuery()
	})
}
