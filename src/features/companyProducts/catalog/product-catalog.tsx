'use client'

import { cn } from '@/shared/lib/classnames'
import { Header } from '@/shared/ui/header'
import { ProductCategorySelect } from '@/features/companyProducts/catalog/product-category-select'
import { ProductNameSearch } from '@/features/companyProducts/catalog/product-name-search'
import { useCatalogProducts } from '@/features/companyProducts/catalog/use-catalog-products'
import { ProductsList } from '@/features/companyProducts/products-list'
import ProductAdd from '@/features/companyProducts/catalog/product-add'

export function ProductCatalog() {
	const {
		data: products,
		isPending,
	} = useCatalogProducts()

	return (
		<div
			className={cn(
				'min-h-[505px] w-full px-4 flex flex-col lg:px-11 xl:px-16',
				'items-center sm:items-start relative pb-10 scroll'
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
				products={products}
				isPending={isPending}
				className={'mt-10'}
			/>
		</div>
	)
}
