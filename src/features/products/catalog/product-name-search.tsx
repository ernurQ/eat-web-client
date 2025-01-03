'use client'

import { debounce } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'

import {
	CATALOG_PAGE,
	CATALOG_PRODUCT_NAME
} from '@/features/products/catalog/constants'

export function ProductNameSearch() {
	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()
	const debounceDelay = 300

	const onChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value
		setSearchParam({
			[CATALOG_PRODUCT_NAME]: name,
			[CATALOG_PAGE]: undefined
		})
	}, debounceDelay)

	return (
		<div className={'sm:px-12 md:px-20 lg:px-32'}>
			<div className={'relative flex'}>
				<label className={'sr-only'}>product by name search</label>
				<AiOutlineSearch
					className={
						'text-2xl absolute left-1 top-1/2 transform -translate-y-1/2 '
					}
				/>
				<input
					onChange={onChange}
					className={cn(
						'border border-black block rounded-2xl min-w-64 max-w-80 flex-grow',
						'ps-8 pe-3 h-8 text-sm'
					)}
					defaultValue={searchParams.get(CATALOG_PRODUCT_NAME) || ''}
					placeholder={'Введите название продукта ....'}
				/>
			</div>
		</div>
	)
}
