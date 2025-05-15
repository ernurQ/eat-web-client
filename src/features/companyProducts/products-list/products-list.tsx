import { cn } from '@/shared/lib/classnames'

import { Product } from '@/entities/products'

import { ProductsListItem } from '@/features/companyProducts/products-list/products-list-item'

type Props = {
	products?: Product[]
	isPending: boolean
	className?: string
}

export function ProductsList({ isPending, products, className }: Props) {
	if (isPending) {
	  return <Skeleton className={className} />;
	}
	console.log(products);
  
	if (!products) {
	  throw new Error('products prop is undefined');
	}
  
	if (products.length === 0) {
	  return (
		<p className={cn('w-full text-center py-10 text-gray-500', className)}>
		  Нет товаров для отображения
		</p>
	  );
	}
  
	return (
	  <ul
		className={cn(
		  'grid gap-5 w-full',
		  'grid-cols-1 sm:grid-cols-3 xl:grid-cols-5',
		  className
		)}
	  >
		{products.map((product) => (
		  <ProductsListItem key={product.id} product={product} />
		))}
	  </ul>
	);
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
