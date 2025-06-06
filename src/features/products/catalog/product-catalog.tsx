'use client'

import { useQuery } from '@tanstack/react-query'
import { Pagination } from 'antd'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/shared/lib/classnames'
import { useSetSearchParam } from '@/shared/lib/hooks/use-set-search-params'
import { Header } from '@/shared/ui/header'

import { listProductsOptions } from '@/entities/products'

import {
	CATALOG_PAGE,
	CATALOG_PAGE_SIZE,
	CATALOG_PRODUCT_CATEGORY,
	CATALOG_PRODUCT_NAME
} from '@/features/products/catalog/constants'
import { ProductCategorySelect } from '@/features/products/catalog/product-category-select'
import { ProductNameSearch } from '@/features/products/catalog/product-name-search'
import { ProductsList } from '@/features/products/products-list'

export function ProductCatalog() {
	const searchParams = useSearchParams()
	const setSearchParams = useSetSearchParam()
	const currentPage = +(searchParams.get(CATALOG_PAGE) || 1)
	const productName = searchParams.get(CATALOG_PRODUCT_NAME) || undefined
	const productCategory =
		searchParams.get(CATALOG_PRODUCT_CATEGORY) || undefined

	const { data, isPending } = useQuery(
		listProductsOptions({
			page: currentPage,
			size: CATALOG_PAGE_SIZE,
			name: productName,
			category: productCategory
		})
	)

	return (
		<div
			className={cn(
				'min-h-[505px] w-full px-4 flex flex-col lg:px-11 xl:px-16',
				'items-center relative pb-10'
			)}
		>
			<Header className={'mx-auto mb-10'}>Каталог</Header>

			<ProductNameSearch />
			<ProductCategorySelect />
			<ProductsList
				products={data?.products}
				isPending={isPending}
				className={'mt-10'}
			/>

			{data?.total !== 0 && (
				<Pagination
					current={currentPage}
					total={data?.total}
					pageSize={CATALOG_PAGE_SIZE}
					align={'center'}
					onChange={(page) =>
						setSearchParams({ [CATALOG_PAGE]: page.toString() })
					}
					style={{ marginTop: 30 }}
				/>
			)}
		</div>
	)
}
