'use client'

import { debounce } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'
import {
	CATALOG_PAGE,
	CATALOG_PRODUCT_NAME
} from '@/features/products/catalog/constants'

export function ProductNameSearch() {
	const [focused, setFocused] = useState(false)
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
		<div className='flex justify-start py-4'>
			<div
				className={cn(
					'relative transition-all duration-300',
					focused ? 'w-80' : 'w-64'
				)}
			>
				{focused && <AiOutlineSearch
					className={cn(
						'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300',
						focused && 'text-[#cddf95] scale-110'
					)}
				/>}

				<input
					onChange={onChange}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					defaultValue={searchParams.get(CATALOG_PRODUCT_NAME) || ''}
					placeholder='Введите название продукта'
					className={cn(
						`w-full border ${focused ? "pl-10" : "pl-4"} pr-4 py-2 rounded-full`,
						'text-sm text-gray-800',
						'focus:bg-white focus:ring-2 focus:ring-[#cddf95]',
						'outline-none transition-all duration-300'
					)}
				/>
			</div>
		</div>
	)
}
