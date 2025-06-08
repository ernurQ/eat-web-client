'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'

import { CartProduct } from '@/entities/cart/types'

import { ProductQuantityForm } from '@/features/products/cart/product-quantity-form'

type ListItemProps = {
	product: CartProduct
}

export function ProductsListItem({ product }: ListItemProps) {
	const { id, thumbnail, name, discountPrice, quantity: maxQuantity, quantityInCart } =
		product

	console.log(product);

	const [initQuantity, setInitQuantity] = useState(quantityInCart)
	return (
		<li
			className={cn(
				'border-t-[1px] border-t-black py-4',
				'flex flex-col items-center gap-2',
				'sm:flex-row sm:gap-10 sm:items-start sm:px-10'
			)}
		>
			<Link
				href={routes.product(id)}
				className={'h-48 w-48 relative flex-shrink-0'}
			>
				<Image
					src={thumbnail}
					alt={name}
					fill
					sizes={
						'(max-width: 640px) 100vw, ' +
						'(max-width: 768px) 50vw, ' +
						'(max-width: 1024px) 33vw, ' +
						'(max-width: 1280px) 15vw, ' +
						'(max-width: 1536px) 12vw, ' +
						'10vw'
					}
					priority
				/>
			</Link>
			<div className={'w-48 sm:w-full'}>
				<Link href={routes.product(id)}>{name}</Link>
				<div className={'text-[#F7C04F] font-bold'}>{discountPrice}</div>
				<ProductQuantityForm
					id={id}
					quantity={initQuantity}
					setQuantity={setInitQuantity}
					maxQuantity={maxQuantity}
				/>
				<div className={'flex justify-between mt-3 w-48 sm:mt-20'}>
					Итого:
					<span className={'text-[#F7C04F] font-bold'}>{Number(discountPrice) * initQuantity}</span>
				</div>
			</div>
		</li>
	)
}
