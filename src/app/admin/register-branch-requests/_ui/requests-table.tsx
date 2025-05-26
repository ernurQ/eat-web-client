'use client'

import { DownloadOutlined } from '@ant-design/icons'
import { Button, Table, TableColumnsType } from 'antd'
import { useSearchParams } from 'next/navigation'

import { ErrorComponent } from '@/shared/lib/ant-design/error-component'
import { useGetTableColumnSearchProps } from '@/shared/lib/ant-design/get-table-column-searchProps'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { useGetRegisterBranchRequestsQuery } from '@/entities/branch'

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
}

export function RequestsTable() {
	const getColumnSearchProps = useGetTableColumnSearchProps<DataType>()

	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()

	const page = parseInt(searchParams.get(branchRequestsPageKey) || '1', 10)
	const name = searchParams.get(branchRequestsNameKey) || undefined
	const bin = searchParams.get(branchRequestsBinKey) || undefined
	const address = searchParams.get(branchRequestsAddressKey) || undefined

	const { data, isPending, isError, error } = useGetRegisterBranchRequestsQuery(
		{
			page,
			name,
			bin,
			address
		}
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
			render: (value) => (
				<Button
					type={'text'}
					href={value}
					download
					target={'_blank'}
					rel='noopener noreferrer'
					icon={<DownloadOutlined />}
				>
					Download
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
					: data.content.map(({ id, name, bin, address, documentUrl }) => ({
							key: id,
							[branchRequestsNameKey]: name,
							[branchRequestsBinKey]: bin,
							[branchRequestsAddressKey]: address,
							[branchRequestsDocumentKey]: documentUrl,
							[branchRequestsActionsKey]: id
						}))
			}
			locale={{
				emptyText: isPending ? '' : 'Нет данных'
			}}
			pagination={{
				position: ['bottomCenter'],
				current: page,
				total: data?.totalElements,
				pageSize: branchRequestsPageSize,
				onChange: (page) =>
					setSearchParam({ [branchRequestsPageKey]: page.toString() })
			}}
		/>
	)
}
