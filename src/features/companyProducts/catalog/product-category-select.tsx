'use client'

import { Select } from 'antd'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import {
	CATALOG_PAGE,
	CATALOG_PRODUCT_CATEGORY
} from '@/features/products/catalog/constants'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const categories = [
	{
		id: '6840522b554c9ad0ab8ba001',
		name: 'Пироги',
		createdAt: '2025-06-01T09:15:42.123Z'
	},
	{
		id: '6840522b554c9ad0ab8ba002',
		name: 'Хлебобулочные изделия',
		createdAt: '2025-06-02T11:22:35.456Z'
	},
	{
		id: '6840522b554c9ad0ab8ba003',
		name: 'Круассаны',
		createdAt: '2025-06-04T14:03:23.707Z'
	},
	{
		id: '6840522b554c9ad0ab8ba004',
		name: 'Консервы',
		createdAt: '2025-06-05T08:45:12.891Z'
	},
	{
		id: '6840522b554c9ad0ab8ba005',
		name: 'Напитки',
		createdAt: '2025-06-06T13:30:55.234Z'
	},
	{
		id: '6840522b554c9ad0ab8ba006',
		name: 'Мясные изделия',
		createdAt: '2025-06-07T16:12:43.567Z'
	},
	{
		id: '6840522b554c9ad0ab8ba007',
		name: 'Овощи',
		createdAt: '2025-06-08T10:05:32.789Z'
	},
	{
		id: '6840522b554c9ad0ab8ba008',
		name: 'Фрукты',
		createdAt: '2025-06-09T14:50:21.012Z'
	},
	{
		id: '6840522b554c9ad0ab8ba009',
		name: 'Кондитерские изделия',
		createdAt: '2025-06-10T17:33:14.345Z'
	},
	{
		id: '6840522b554c9ad0ab8ba010',
		name: 'Бакалея',
		createdAt: '2025-06-11T19:20:05.678Z'
	}
]

export function ProductCategorySelect() {
	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()

	// const { data: categories, isPending, isError } = useCategoriesQuery()
	const selectedCategory = searchParams.get(CATALOG_PRODUCT_CATEGORY) || ''

	// if (isPending) return <Skeleton />
	// if (isError) return <p>Something went wrong</p>

	// const onCategoryClick = (category: string) => {
	// 	if (selectedCategory === category) {
	// 		return setSearchParam({
	// 			[CATALOG_PRODUCT_CATEGORY]: undefined,
	// 			[CATALOG_PAGE]: undefined
	// 		})
	// 	}

	// 	setSearchParam({
	// 		[CATALOG_PRODUCT_CATEGORY]: category,
	// 		[CATALOG_PAGE]: undefined
	// 	})

	// }

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

	console.log(selectedCategory)

	return (
		<div className='mt-5'>
			<Select
				showSearch
				placeholder='Выберите категорию продукта'
				optionFilterProp='label'
				options={categories.map((category) => ({
					value: category.name.toLowerCase(),
					label: category.name
				}))}
				onChange={handleCategoryChange}
				value={selectedCategory || undefined}
				popupMatchSelectWidth={false}
			/>
		</div>
		// <ul
		// 	className={cn(
		// 		'mt-5 flex flex-wrap gap-x-10 gap-y-1 justify-center'
		// 	)}
		// >
		// 	{categories?.map((category) => (
		// 		<li key={category.id}>
		// 			<button
		// 				onClick={() => onCategoryClick(category)}
		// 				className={cn({
		// 					'text-[#BAD36E] underline underline-offset-8':
		// 						selectedCategory === category
		// 				})}
		// 			>
		// 				{category}
		// 			</button>
		// 		</li>
		// 	))}
		// </ul>
	)
}

function Skeleton() {
	return (
		<ul
			className={cn(
				'animate-pulse mt-5 flex flex-wrap gap-x-10 gap-y-1 justify-center',
				'sm:px-12 md:px-20 lg:px-32'
			)}
		>
			{Array.from({ length: 10 }).map((_item, index) => (
				<li
					key={index}
					className={cn('h-6 bg-gray-200 rounded-full', {
						'w-20': index % 1 === 0,
						'w-28': index % 2 === 0,
						'w-32': index % 3 === 0
					})}
				/>
			))}
		</ul>
	)
}
