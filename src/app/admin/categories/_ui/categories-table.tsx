'use client'

import { useQuery } from '@tanstack/react-query'
import { Table, TableColumnsType } from 'antd'

import { ErrorComponent } from '@/shared/lib/ant-design/error-component'

import { categoriesQueryOptions } from '@/entities/category'

import { DeleteCategoryButton } from '@/features/category/delete-category-button'

const categoryNameKey = 'category-name'
const categoryCreatedDateKey = 'category-created-date'
const deleteCategoryKey = 'delete-category'

export function CategoriesTable() {
	const {
		data: categories,
		isPending,
		isError,
		error
	} = useQuery(categoriesQueryOptions())

	const columns: TableColumnsType = [
		{
			title: 'Название',
			dataIndex: categoryNameKey,
			key: categoryNameKey
		},
		{
			title: 'Дата создания',
			dataIndex: categoryCreatedDateKey,
			key: categoryCreatedDateKey
		},
		{
			dataIndex: deleteCategoryKey,
			key: deleteCategoryKey,
			render: (id) => <DeleteCategoryButton categoryId={id} />,
			align: 'center'
		}
	]

	if (isError) {
		return <ErrorComponent error={error} />
	}

	return (
		<Table
			loading={isPending}
			columns={columns}
			dataSource={
				isPending
					? []
					: categories.map(({ id, name, createdAt }) => ({
							key: id,
							[categoryNameKey]: name,
							[categoryCreatedDateKey]: new Date(createdAt).toLocaleString(
								'ru-RU',
								{
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit'
								}
							),
							[deleteCategoryKey]: id
						}))
			}
			locale={{
				emptyText: isPending ? '' : 'Нет данных'
			}}
			pagination={false}
		/>
	)
}
