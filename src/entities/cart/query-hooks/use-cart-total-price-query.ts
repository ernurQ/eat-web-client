import { InvalidateQueryFilters, useQuery } from '@tanstack/react-query'

import { queryClient } from '@/app/api/query-client'

import { cartApi } from '@/entities/cart/cart-api'

const CART_TOTAL_PRICE_KEY = 'cart-total-price'

export function useCartTotalPriceQuery() {
	return useQuery({
		queryKey: [CART_TOTAL_PRICE_KEY],
		queryFn: () => cartApi.getCartTotalPrice(),
		staleTime: 1000 * 60 * 15
	})
}

export async function invalidateCartTotalPriceQuery(
	filters?: InvalidateQueryFilters
) {
	return queryClient.invalidateQueries({
		queryKey: [CART_TOTAL_PRICE_KEY],
		...filters
	})
}

export async function clearCartTotalPriceQuery() {
	return queryClient.setQueriesData({ queryKey: [CART_TOTAL_PRICE_KEY] }, 0)
}
