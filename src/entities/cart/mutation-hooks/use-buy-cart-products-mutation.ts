import { useIsMutating, useMutation } from '@tanstack/react-query'

import { cartApi } from '@/entities/cart/cart-api'
import { clearCartProductsQuery } from '@/entities/cart/query-hooks/use-cart-products-query'
import { clearCartTotalPriceQuery } from '@/entities/cart/query-hooks/use-cart-total-price-query'

const BUY_CART_PRODUCTS_KEY = 'buy-cart-products'

export function useBuyCartProductsMutation() {
	return useMutation({
		mutationKey: [BUY_CART_PRODUCTS_KEY],
		mutationFn: () => cartApi.buyCartProducts(),
		onSuccess: async () => {
			await clearCartProductsQuery()
			await clearCartTotalPriceQuery()
		}
	})
}

export function useIsBuyCartProductsMutating() {
	return useIsMutating({ mutationKey: [BUY_CART_PRODUCTS_KEY] })
}
