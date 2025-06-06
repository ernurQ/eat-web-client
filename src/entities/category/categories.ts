import { queryOptions } from '@tanstack/react-query'

import { api, queryClient } from '@/shared/api'

type ResponseData = Array<{
	id: string
	name: string
	createdAt: string
}> | null

export function categoriesQueryOptions() {
	return queryOptions({
		queryKey: ['categories'],
		queryFn: () =>
			api
				.get<ResponseData>('/products/categories')
				.then((res) => res.data || []),
		staleTime: Infinity
	})
}

export async function invalidateCategoriesQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['categories']
	})
}
