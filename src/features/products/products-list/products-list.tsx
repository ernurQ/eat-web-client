import { cn } from '@/shared/lib/classnames'

import { Product } from '@/entities/products'

import { ProductsListItem } from '@/features/products/products-list/products-list-item'

type Props = {
	products?: Product[]
	isPending: boolean
	className?: string
	gridColNum?: number
}

export function ProductsList({ isPending, products, className, gridColNum=6, }: Props) {
	if (isPending) return <Skeleton className={className} />
	if (!products) throw Error('products prop is undefined')

	return (
		<ul
			className={cn(
				'grid gap-5 w-full',
				`grid-cols-1 sm:grid-cols-3 xl:grid-cols-${gridColNum}`,
				className
			)}
		>
			{products.map((product) => (
				<ProductsListItem
					key={product.id}
					product={product}
				/>
			))}
		</ul>
	)
}

function Skeleton({ className }: { className?: string }) {
	return (
		<ul
			className={cn(
				'grid gap-5 w-full',
				'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6',
				className
			)}
		>
			{Array.from({ length: 6 }).map((_item, index) => (
				<li
					key={index}
					className={
						'w-48 h-[324px] mx-auto flex flex-col justify-between bg-white'
					}
				>
					<div>
						<div className={'bg-gray-200 animate-pulse rounded w-48 h-48'} />
						<div
							className={'bg-gray-200 animate-pulse rounded w-2/3 h-4 mt-2'}
						/>
					</div>
					<div className={'flex flex-wrap justify-between mt-2'}>
						<div className={'h-11 w-20 bg-gray-200 animate-pulse rounded'} />
						<div className={'h-11 w-20 bg-gray-200 animate-pulse rounded'} />
					</div>
				</li>
			))}
		</ul>
	)
}
