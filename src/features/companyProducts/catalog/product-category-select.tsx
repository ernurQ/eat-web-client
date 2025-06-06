'use client'

import { useQuery } from '@tanstack/react-query'
import { Select } from 'antd'
import { useSearchParams } from 'next/navigation'

import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { categoriesQueryOptions } from '@/entities/category'

import { CATALOG_PAGE, CATALOG_PRODUCT_CATEGORY } from './constants'

export function ProductCategorySelect() {
	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()
	const selectedCategory = searchParams.get(CATALOG_PRODUCT_CATEGORY) || ''

	const handleCategoryChange = (value: string) => {
		if (selectedCategory === value) {
			return setSearchParam({
				[CATALOG_PRODUCT_CATEGORY]: undefined,
				[CATALOG_PAGE]: undefined
			})
		}

		setSearchParam({
			[CATALOG_PRODUCT_CATEGORY]: value,
			[CATALOG_PAGE]: undefined
		})
	}

	const {
		data: categories,
		isPending,
		isError
	} = useQuery(categoriesQueryOptions())

	if (isError) {
		return <p>Что то пошло не так</p>
	}

	return (
		<div className='mt-5'>
			<Select
				showSearch
				placeholder='Выберите категорию продукта'
				optionFilterProp='label'
				options={(categories || []).map((category) => ({
					value: category.name.toLowerCase(),
					label: category.name
				}))}
				loading={isPending}
				onChange={handleCategoryChange}
				value={selectedCategory || undefined}
				popupMatchSelectWidth={false}
				style={{
					width: 267
				}}
			/>
		</div>
	)
}
