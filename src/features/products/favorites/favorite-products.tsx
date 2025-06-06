import { useQuery } from '@tanstack/react-query'

import { cn } from '@/shared/lib/classnames'
import { Header } from '@/shared/ui/header'

import { listFavoritesOptions } from '@/entities/favorites'

import { ProductsList } from '@/features/products/products-list'

export function FavoriteProducts() {
	const { data: products, isPending } = useQuery(listFavoritesOptions())

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
				isFavoriteProducts={true}
			/>
		</div>
	)
}
