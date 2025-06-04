import { MutationOptions } from '@tanstack/react-query'

import { ApiError, api } from '@/shared/api'

type Data = {
	name: string
}

type ResponseDate = void

export function addCategoryOptions() {
	return {
		mutationFn: ({ name }) =>
			api.post('/products/categories', { name }).then((res) => res.data)
	} satisfies MutationOptions<ResponseDate, ApiError, Data>
}
