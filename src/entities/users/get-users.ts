import { useQuery } from '@tanstack/react-query'

export type UserRole = 'customer' | 'seller' | 'admin'

type Data = {
	page: number
	name?: string
	surname?: string
	role?: UserRole
}

type ResponseData = {
	content: Array<{
		id: string
		name: string
		surname: string
		role: UserRole
	}>
	totalElements: number
}

export function useGetUsersQuery({ page, name, surname, role }: Data) {
	return useQuery({
		queryKey: ['users', { page, name, surname, role }],
		queryFn: () =>
			new Promise<ResponseData>((resolve) =>
				resolve({
					content: [
						{
							id: '1',
							name: 'John',
							surname: 'Doe',
							role: 'admin'
						},
						{
							id: '2',
							name: 'Alice',
							surname: 'Smith',
							role: 'seller'
						},
						{
							id: '3',
							name: 'Bob',
							surname: 'Johnson',
							role: 'customer'
						}
					],
					totalElements: 3
				})
			)
	})
}
