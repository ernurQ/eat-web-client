import { cn } from '@/shared/lib/classnames'
import { Header } from '@/shared/ui/header'
import { PaginationButtons } from '@/shared/ui/pagination-buttons'

import { CATALOG_PAGE } from '@/features/products/catalog/constants'
import { useFavoriteProducts } from '@/features/products/favorites/use-favorite-products'
import { ProductsList } from '@/features/products/products-list'

export function FavoriteProducts() {
	const {
		data: products,
		isPending,
		currentPage,
		hasNextPage
	} = useFavoriteProducts()

	return (
		<div
			className={cn(
				'min-h-[505px] w-full px-4 flex flex-col lg:px-11 xl:px-16',
				'items-center sm:items-start relative pb-10'
			)}
		>
			<Header className={'mx-auto mb-10'}>Любимое</Header>

			<ProductsList
				products={products}
				isPending={isPending}
				className={'mt-10'}
			/>

			<PaginationButtons
				currentPage={currentPage}
				pageSearchParam={CATALOG_PAGE}
				disabled={isPending}
				hasNextPage={hasNextPage}
				className={'absolute bottom-0 right-1/2 translate-x-1/2'}
			/>
		</div>
	)
}
