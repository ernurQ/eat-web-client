import { useQuery } from '@tanstack/react-query'

import { queryClient } from '@/shared/api/query-client'

import { cartApi } from '@/entities/cart/cart-api'

const CART_PRODUCTS_KEY = 'cart-products'

export function useCartProductsQuery() {
	return useQuery({
		queryKey: [CART_PRODUCTS_KEY],
		queryFn: () => cartApi.getCartProducts(),
		staleTime: 1000 * 60 * 15
	})
}

export async function invalidateCartProductsQuery() {
	await queryClient.invalidateQueries({ queryKey: [CART_PRODUCTS_KEY] })
}

export async function clearCartProductsQuery() {
	return queryClient.setQueriesData({ queryKey: [CART_PRODUCTS_KEY] }, [])
}
