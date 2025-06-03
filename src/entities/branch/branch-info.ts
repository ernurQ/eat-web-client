import { queryOptions } from '@tanstack/react-query'

import { api } from '@/shared/api'

type Data = {
	id: string
}

type ResponseData = {
	branch: {
		id: string
		name: string
		description: string
		thumbnail: string
		location: string
	}
}

export function branchInfoQueryOptions(data: Data) {
	const { id } = data
	return queryOptions({
		queryKey: ['branch-info', { id }],
		queryFn: () =>
			api.get<ResponseData>(`/branches/${id}`).then((res) => res.data.branch)
	})
}
