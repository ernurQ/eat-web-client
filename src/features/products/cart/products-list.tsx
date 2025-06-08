import { useQuery } from '@tanstack/react-query'

import { cn } from '@/shared/lib/classnames'

import { getCartOptions } from '@/entities/cart/get-cart'

import { ProductsListItem } from '@/features/products/cart/products-list-item'

export function ProductsList() {
	const {
		data: products,
		isPending,
		isError,
		error
	} = useQuery(getCartOptions())

	if (isPending) return <Skeleton />
	if (isError) {
		console.log(error)
		return <div>something went wrong</div>
	}

	return (
		<ul className={'border-b-[1px] border-b-black px-4 mt-10'}>
			{products.products.map((product) => (
				<ProductsListItem
					key={product.id}
					product={product}
				/>
			))}
		</ul>
	)
}

function Skeleton() {
	return (
		<ul className={'border-b-[1px] border-b-gray-200 px-4 mt-10 animate-pulse'}>
			{Array.from({ length: 6 }).map((_, index) => (
				<li
					key={index}
					className={cn(
						'border-t-[1px] border-t-gray-200 py-4',
						'flex flex-col items-center gap-2',
						'sm:flex-row sm:gap-10 sm:items-start sm:px-10'
					)}
				>
					<div
						className={'h-48 w-48 flex-shrink-0 bg-gray-200 animate-pulse'}
					/>
					<div className={'w-48 sm:w-full'}>
						<div className={'h-4 w-36 bg-gray-200 animate-pulse rounded'} />
						<div
							className={'h-4 w-10 bg-gray-200 animate-pulse rounded mt-2'}
						/>
						<div
							className={'h-6 bg-gray-200 animate-pulse rounded w-20 mt-5'}
						/>

						<div className={'flex justify-between mt-3 w-48 sm:mt-20 pt-2'}>
							<div className={'h-4 w-10 bg-gray-200 animate-pulse rounded'} />

							<div className={'h-4 w-10 bg-gray-200 animate-pulse rounded'} />
						</div>
					</div>
				</li>
			))}
		</ul>
	)
}
