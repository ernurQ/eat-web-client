'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import { categoriesQueryOptions } from '@/entities/category'

import {
	CATALOG_PAGE,
	CATALOG_PRODUCT_CATEGORY
} from '@/features/products/catalog/constants'

export function ProductCategorySelect() {
	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()

	const {
		data: categories,
		isPending,
		isError
	} = useQuery(categoriesQueryOptions())
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
				'w-full mt-6 flex flex-wrap justify-start items-center',
				'gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2',
				'px-4 sm:px-10 md:px-20 lg:px-32',
				'border border-gray-200 rounded-full py-2'
			)}
		>
			{categories?.map(({ id, name }, index) => (
				<li
					key={id}
					className='flex items-center'
				>
					<button
						onClick={() => onCategoryClick(name)}
						className={cn(
							'text-sm md:text-base font-medium text-gray-600 hover:text-[#BAD36E]',
							'transition-colors duration-200 ease-in-out',
							'hover:underline underline-offset-8',
							selectedCategory === name &&
								'text-[#BAD36E] underline underline-offset-8 font-semibold'
						)}
					>
						{name}
					</button>

					{/* | separator except after the last item */}
					{index < categories.length - 1 && (
						<span className='mx-2 text-gray-300'>|</span>
					)}
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
