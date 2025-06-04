'use client'

import { DownloadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Table, TableColumnsType } from 'antd'
import { useSearchParams } from 'next/navigation'

import { api } from '@/shared/api'
import { ErrorComponent } from '@/shared/lib/ant-design/error-component'
import { useGetTableColumnSearchProps } from '@/shared/lib/ant-design/get-table-column-searchProps'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { registerBranchRequestsQueryOptions } from '@/entities/branch'

import { BranchRequestActionsDropdown } from '@/app/admin/register-branch-requests/_ui/branch-request-actions-dropdown'

const branchRequestsPageKey = 'page'
const branchRequestsNameKey = 'name'
const branchRequestsBinKey = 'bin'
const branchRequestsAddressKey = 'address'
const branchRequestsDocumentKey = 'document'
const branchRequestsActionsKey = 'actions'
const branchRequestsPageSize = 10

interface DataType {
	key: string
	[branchRequestsNameKey]: string
	[branchRequestsBinKey]: string
	[branchRequestsAddressKey]: string
	[branchRequestsDocumentKey]: {
		branchName: string
		document: string
	}
}

export function RequestsTable() {
	const getColumnSearchProps = useGetTableColumnSearchProps<DataType>()

	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()

	const page = parseInt(searchParams.get(branchRequestsPageKey) || '1', 10)
	const name = searchParams.get(branchRequestsNameKey) || undefined
	const bin = searchParams.get(branchRequestsBinKey) || undefined
	const address = searchParams.get(branchRequestsAddressKey) || undefined

	const { data, isPending, isError, error } = useQuery(
		registerBranchRequestsQueryOptions({
			page,
			size: branchRequestsPageSize,
			name,
			bin,
			address
		})
	)

	const handleSearch = (key: string, value: string) => {
		setSearchParam({ [key]: value })
	}

	const handleReset = (key: string) => {
		setSearchParam({ [key]: undefined })
	}

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Название компании',
			dataIndex: branchRequestsNameKey,
			key: branchRequestsNameKey,
			...getColumnSearchProps(
				branchRequestsNameKey,
				name || '',
				handleSearch,
				handleReset
			)
		},
		{
			title: 'БИН',
			dataIndex: branchRequestsBinKey,
			key: branchRequestsBinKey,
			...getColumnSearchProps(
				branchRequestsBinKey,
				bin || '',
				handleSearch,
				handleReset
			)
		},
		{
			title: 'Адрес',
			dataIndex: branchRequestsAddressKey,
			key: branchRequestsAddressKey,
			...getColumnSearchProps(
				branchRequestsAddressKey,
				address || '',
				handleSearch,
				handleReset
			)
		},
		{
			title: 'Документ',
			dataIndex: branchRequestsDocumentKey,
			key: branchRequestsDocumentKey,
			render: ({ branchName, document: branchDocument }) => (
				<Button
					type={'text'}
					icon={<DownloadOutlined />}
					onClick={async () => {
						try {
							const response = await api.get(branchDocument, {
								responseType: 'blob'
							})

							const contentDisposition = response.headers['content-disposition']
							let fileName = `${branchName}-document.pdf`
							if (contentDisposition) {
								const match = contentDisposition.match(/filename="?(.+)"?/)
								if (match?.[1]) fileName = decodeURIComponent(match[1])
							}

							const blobUrl = window.URL.createObjectURL(response.data)

							const link = document.createElement('a')
							link.href = blobUrl
							link.download = fileName
							document.body.appendChild(link)
							link.click()
							link.remove()

							window.URL.revokeObjectURL(blobUrl)
						} catch (e) {
							console.error('Ошибка загрузки:', e)
						}
					}}
				>
					Скачать
				</Button>
			)
		},
		{
			dataIndex: branchRequestsActionsKey,
			key: branchRequestsActionsKey,
			render: (id) => <BranchRequestActionsDropdown branchId={id} />,
			align: 'center'
		}
	]

	if (isError) {
		return <ErrorComponent error={error} />
	}

	return (
		<Table<DataType>
			loading={isPending}
			columns={columns}
			dataSource={
				isPending
					? []
					: data.sellers.map(({ id, branchName, bin, location, document }) => ({
							key: id,
							[branchRequestsNameKey]: branchName,
							[branchRequestsBinKey]: bin,
							[branchRequestsAddressKey]: location,
							[branchRequestsDocumentKey]: {
								branchName,
								document
							},
							[branchRequestsActionsKey]: id
						}))
			}
			locale={{
				emptyText: isPending ? '' : 'Нет данных'
			}}
			pagination={{
				position: ['bottomCenter'],
				current: page,
				total: data?.total,
				pageSize: branchRequestsPageSize,
				onChange: (page) =>
					setSearchParam({ [branchRequestsPageKey]: page.toString() })
			}}
		/>
	)
}
