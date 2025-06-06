'use client'

import { useQuery } from '@tanstack/react-query'
import { Pagination } from 'antd'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'
import { Header } from '@/shared/ui/header'

import { listOwnerProductsOptions } from '@/entities/products'

import ProductAdd from '@/features/companyProducts/catalog/product-add'
import { ProductCategorySelect } from '@/features/companyProducts/catalog/product-category-select'
import { ProductNameSearch } from '@/features/companyProducts/catalog/product-name-search'
import { ProductsList } from '@/features/companyProducts/products-list'

import {
	CATALOG_PAGE,
	CATALOG_PAGE_SIZE,
	CATALOG_PRODUCT_CATEGORY,
	CATALOG_PRODUCT_NAME
} from './constants'

export function ProductCatalog() {
	const searchParams = useSearchParams()
	const setSearchParam = useSetSearchParam()
	const page = parseInt(searchParams.get(CATALOG_PAGE) || '1', 10)
	const name = searchParams.get(CATALOG_PRODUCT_NAME) || undefined
	const category = searchParams.get(CATALOG_PRODUCT_CATEGORY) || undefined

	const { data, isPending } = useQuery(
		listOwnerProductsOptions({
			page,
			size: CATALOG_PAGE_SIZE,
			name,
			category
		})
	)

	return (
		<div
			className={cn(
				'min-h-[505px] w-full px-4 flex flex-col lg:px-11 xl:px-16',
				'items-center relative pb-10 scroll'
			)}
		>
			<Header className={'mx-auto mb-10'}>Каталог</Header>

			<div className='w-full flex justify-between'>
				<div>
					<ProductNameSearch />
					<ProductCategorySelect />
				</div>
				<ProductAdd />
			</div>
			<ProductsList
				products={data?.products}
				isPending={isPending}
				className={'mt-10'}
			/>

			{data?.products.length !== 0 && (
				<Pagination
					current={page}
					total={data?.total}
					pageSize={CATALOG_PAGE_SIZE}
					align={'center'}
					onChange={(page) =>
						setSearchParam({ [CATALOG_PAGE]: page.toString() })
					}
					style={{ marginTop: 30 }}
				/>
			)}
		</div>
	)
}
