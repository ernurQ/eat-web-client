'use client'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { useCategoriesQuery } from '@/entities/products'

import {
	CATALOG_PAGE,
	CATALOG_PRODUCT_CATEGORY
} from '@/features/products/catalog/constants'

export function ProductCategorySelect() {
	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()

	const { data: categories, isPending, isError } = useCategoriesQuery()
	const selectedCategory = searchParams.get(CATALOG_PRODUCT_CATEGORY) || ''

	if (isPending) return <Skeleton />
	if (isError) return <p>Something went wrong</p>

	const onCategoryClick = (category: string) => {
		if (selectedCategory === category) {
			return setSearchParam({
				[CATALOG_PRODUCT_CATEGORY]: undefined,
				[CATALOG_PAGE]: undefined
			})
		}

		setSearchParam({
			[CATALOG_PRODUCT_CATEGORY]: category,
			[CATALOG_PAGE]: undefined
		})
	}

	return (
		<ul
			className={cn(
				'mt-5 flex flex-wrap gap-x-10 gap-y-1 justify-center',
				'sm:px-12 md:px-20 lg:px-32'
			)}
		>
			{categories?.map((category) => (
				<li key={category}>
					<button
						onClick={() => onCategoryClick(category)}
						className={cn({
							'text-[#BAD36E] underline underline-offset-8':
								selectedCategory === category
						})}
					>
						{category}
					</button>
				</li>
			))}
		</ul>
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
