'use client'

import { cn } from '@/shared/lib/classnames'
import { Header } from '@/shared/ui/header'

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
				'min-h-[505px] w-full px-4 flex flex-col lg:px-11 xl:px-16',
				'items-center sm:items-start relative pb-10'
			)}
		>
			<Header className={'mx-auto mb-10'}>Каталог</Header>

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
