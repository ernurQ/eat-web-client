'use client'

import { Table, TableColumnsType } from 'antd'
import { useSearchParams } from 'next/navigation'

import { ErrorComponent } from '@/shared/lib/ant-design/error-component'
import { useGetTableColumnSearchProps } from '@/shared/lib/ant-design/get-table-column-searchProps'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { UserRole, useGetUsersQuery } from '@/entities/users'

import { ChangeUserRoleButton } from '@/features/users/change-user-role-button'

const usersPageKey = 'users-page'
const usersNameKey = 'user-name'
const usersSurnameKey = 'user-surname'
const usersRoleKey = 'user-role'
const usersChangeRoleKey = 'change-user-role'
const usersPageSize = 10

type DataType = {
	key: string
	[usersNameKey]: string
	[usersSurnameKey]: string
	[usersRoleKey]: UserRole
}

export function UsersTable() {
	const getColumnSearchProps = useGetTableColumnSearchProps<DataType>()

	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()

	const page = parseInt(searchParams.get(usersPageKey) || '1', 10)
	const name = searchParams.get(usersNameKey) || undefined
	const surname = searchParams.get(usersSurnameKey) || undefined
	const roleParam = searchParams.get(usersRoleKey) || undefined
	const role =
		roleParam === 'customer' || roleParam === 'seller' || roleParam === 'admin'
			? roleParam
			: undefined

	const { data, isPending, isError, error } = useGetUsersQuery({
		page,
		name,
		surname,
		role
	})

	const handleSearch = (key: string, value: string) => {
		setSearchParam({ [key]: value })
	}

	const handleReset = (key: string) => {
		setSearchParam({ [key]: undefined })
	}

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Имя',
			dataIndex: usersNameKey,
			key: usersNameKey,
			...getColumnSearchProps(
				usersNameKey,
				name || '',
				handleSearch,
				handleReset
			)
		},
		{
			title: 'Фамилия',
			dataIndex: usersSurnameKey,
			key: usersSurnameKey,
			...getColumnSearchProps(
				usersSurnameKey,
				surname || '',
				handleSearch,
				handleReset
			)
		},
		{
			title: 'Роль',
			dataIndex: usersRoleKey,
			key: usersRoleKey,
			filterMultiple: false,
			filteredValue: role && [role],
			filters: [
				{
					text: 'Пользователь',
					value: 'user'
				},
				{
					text: 'Продавец',
					value: 'seller'
				},
				{
					text: 'Админ',
					value: 'admin'
				}
			]
		},
		{
			dataIndex: usersChangeRoleKey,
			key: usersChangeRoleKey,
			render: (id) => <ChangeUserRoleButton userId={id} />,
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
					: data.content.map(({ id, name, surname, role }) => ({
							key: id,
							[usersNameKey]: name,
							[usersSurnameKey]: surname,
							[usersRoleKey]: role,
							[usersChangeRoleKey]: id
						}))
			}
			locale={{
				emptyText: isPending ? '' : 'Нет данных'
			}}
			pagination={{
				position: ['bottomCenter'],
				current: page,
				total: data?.totalElements,
				pageSize: usersPageSize
			}}
			onChange={(pagination, filters) => {
				const selectedRole = filters[usersRoleKey]?.[0] as UserRole | undefined
				setSearchParam({
					[usersRoleKey]: selectedRole,
					...(pagination?.current && {
						[usersPageKey]: pagination.current.toString()
					})
				})
			}}
		/>
	)
}
