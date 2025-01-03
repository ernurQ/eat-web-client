'use client'

import { cn } from '@/shared/lib/classnames'

import { ControlButtons } from '@/features/products/catalog/control-buttons'
import { ProductCategorySelect } from '@/features/products/catalog/product-category-select'
import { ProductNameSearch } from '@/features/products/catalog/product-name-search'
import { useCatalogProducts } from '@/features/products/catalog/use-catalog-products'
import { ProductsList } from '@/features/products/products-list'

export function ProductCatalog() {
	const { data: products, isPending } = useCatalogProducts()

	return (
		<div
			className={cn(
				'min-h-[505px] w-full px-4 mt-10 flex flex-col',
				'items-center sm:items-start relative pb-10'
			)}
		>
			<ProductNameSearch />
			<ProductCategorySelect />
			<ProductsList
				products={products}
				isPending={isPending}
				className={'mt-10'}
			/>
			<ControlButtons />
		</div>
	)
}
