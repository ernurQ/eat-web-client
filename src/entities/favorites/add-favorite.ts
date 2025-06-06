import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api } from '@/shared/api'

type Data = {
	productId: string
}

type ResponseData = void

export function addFavoriteOptions() {
	return {
		mutationFn: ({ productId }) =>
			api.post('/favorites', {
				product_id: productId
			})
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
