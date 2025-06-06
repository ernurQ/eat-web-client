import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api } from '@/shared/api'

type Data = {
	productId: string
}

type ResponseData = void

export function deleteFavoriteOptions() {
	return {
		mutationFn: ({ productId }) =>
			api.delete('/favorites', {
				data: {
					product_id: productId
				}
			})
	} satisfies MutationOptions<ResponseData, ApiError, Data>
}
