import { queryOptions } from '@tanstack/react-query'

import { api, queryClient } from '@/shared/api'

export type UserRole = 'customer' | 'seller' | 'admin'

type Data = {
	page: number
	size: number
	name?: string
	surname?: string
	role?: UserRole
}

type ResponseData = {
	users: Array<{
		ID: string
		Name: string
		Surname: string
		Email: string
		Role: 'customer' | 'seller' | 'admin'
	}> | null
	total: number
}

export function usersQueryOptions(data: Data) {
	const { page, size, name, role } = data
	return queryOptions({
		queryKey: ['users', { page, size, name, role }],
		queryFn: () =>
			api
				.get<ResponseData>('/auth/admin/users', {
					params: {
						Page: page,
						Limit: size,
						Role: role,
						Search: name
					}
				})
				.then((res) => res.data)
				.then(({ users, total }) => ({ users: users || [], total }))
	})
}

export async function invalidateUsersQuery() {
	await queryClient.invalidateQueries({
		queryKey: ['users']
	})
}
