import { useQuery } from '@tanstack/react-query'

type Data = {
	page: number
	name?: string
	bin?: string
	address?: string
}

type ResponseData = {
	content: Array<{
		id: string
		name: string
		bin: string
		address: string
		documentUrl: string
	}>
	totalElements: number
}
const content = [
	{
		id: '1',
		name: 'Coffee boom',
		bin: '123456789012',
		address: '123 Main St, New York, NY',
		documentUrl: 'https://i.ytimg.com/vi/qmfn0KQTCJ0/maxresdefault.jpg'
	},
	{
		id: '2',
		name: 'Starbucks ',
		bin: '987654321098',
		address: '456 Elm St, Los Angeles, CA',
		documentUrl: 'https://i.ytimg.com/vi/qmfn0KQTCJ0/maxresdefault.jpg'
	},
	{
		id: '3',
		name: 'Dunkin',
		bin: '456789123456',
		address: '789 Oak St, Chicago, IL',
		documentUrl: 'https://i.ytimg.com/vi/qmfn0KQTCJ0/maxresdefault.jpg'
	},
	{
		id: '4',
		name: 'Tully’s Coffee',
		bin: '321654987321',
		address: '321 Pine St, Houston, TX',
		documentUrl: 'https://i.ytimg.com/vi/qmfn0KQTCJ0/maxresdefault.jpg'
	}
]

export function useGetRegisterBranchRequestsQuery({
	page,
	name,
	bin,
	address
}: Data) {
	return useQuery({
		queryKey: ['register-branch-requests', { page, name, bin, address }],
		queryFn: () =>
			new Promise<ResponseData>((resolve) =>
				setTimeout(() => resolve({ content, totalElements: 4 }), 1000)
			),
		staleTime: 1000 * 60
	})
}
