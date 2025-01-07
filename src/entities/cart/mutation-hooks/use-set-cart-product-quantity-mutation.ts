import {
	DefaultError,
	UseMutationOptions,
	useMutation
} from '@tanstack/react-query'

import { cartApi } from '@/entities/cart/cart-api'
import { invalidateCartTotalPriceQuery } from '@/entities/cart/query-hooks/use-cart-total-price-query'

export function useSetCartProductQuantityMutation(
	options?: UseMutationOptions<
		void,
		DefaultError,
		{ id: string; quantity: number }
	>
) {
	return useMutation({
		mutationFn: (options) => cartApi.setCartProductQuantity(options),
		onMutate: () => invalidateCartTotalPriceQuery({ refetchType: 'none' }),
		onSettled: () => invalidateCartTotalPriceQuery(),
		...options
	})
}
