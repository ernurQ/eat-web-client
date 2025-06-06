'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'

import ProductModal from '@/features/products/products-list/ProductModal'
import { AddToFavoritesButton } from '@/features/products/products-list/add-to-favorites-button'

import { ListItem } from './types'

type Props = {
	product: ListItem
	isFavorite?: boolean
}

type PriceProps = {
	price: number
	discountedPrice: number
}

export function ProductsListItem({ product, isFavorite }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [thumbnail, setThumbnail] = useState(product.thumbnail)

	return (
		<>
			<li
				className={cn('w-48 mx-auto bg-white', 'flex flex-col justify-between')}
			>
				<div>
					<div className={'relative h-48 w-48 block flex-shrink mx-auto'}>
						<Image
							src={thumbnail}
							onError={() =>
								setThumbnail('/images/placeholder/product-thumbnail.jpg')
							}
							alt={product.name}
							fill
							priority
							sizes={
								'(max-width: 640px) 100vw, ' +
								'(max-width: 768px) 50vw, ' +
								'(max-width: 1024px) 33vw, ' +
								'25vw'
							}
							className={'rounded'}
						/>
					</div>

					<div className={'flex mt-2 justify-between text-base items-start'}>
						<div className={'flex flex-wrap items-center gap-x-2'}>
							<span className={'font-medium flex-wrap'}>{product.name}</span>
							<div className={'h-1 w-1 rounded-full bg-[#228536]'} />

							{product.branchId && (
								<Link
									href={routes.branch.profile(product.branchId)}
									className={'text-[#228536]'}
								>
									{product.branchName}
								</Link>
							)}
						</div>

						<AddToFavoritesButton
							isFavorite={isFavorite}
							productId={product.id}
						/>
					</div>
				</div>

				<div className={'flex flex-wrap justify-between mt-2'}>
					<button
						onClick={() => setIsModalOpen(true)} // Open modal on click
						className={
							'text-sm outline-none bg-[#F7C04F] h-11 w-24 flex justify-center items-center rounded text-white hover:bg-[#ba903c] transition-colors ease-in-out duration-300'
						}
					>
						Добавить в корзину
					</button>
					<Price
						price={product.price}
						discountedPrice={product.discountPrice ?? 0}
					/>
				</div>
			</li>

			{/* Modal */}
			{isModalOpen && (
				<ProductModal
					productId={product.id}
					onCloseAction={() => setIsModalOpen(false)}
				/>
			)}
		</>
	)
}

export function Price({ price, discountedPrice }: PriceProps) {
	if (discountedPrice === 0 || discountedPrice === undefined)
		return (
			<div
				className={cn(
					'h-11 w-20 border-[#F7C04F] border-2 rounded ',
					'flex justify-center items-center font-bold'
				)}
			>
				{price} тг
			</div>
		)

	return (
		<div
			className={cn(
				'h-11 w-20 border-[#F7C04F] border-2 rounded',
				'text-center flex flex-col justify-center'
			)}
		>
			<div className={'font-bold'}>{discountedPrice} тг</div>
			<div className={'text-sm flex justify-center items-center gap-1'}>
				<span className={'line-through decoration-red-500 text-[10px]'}>
					{price}
				</span>
				<div className={'h-1 w-1 rounded-full bg-red-500'} />
				<div className={'text-red-500 text-[10px]'}>
					-{Math.round(((price - discountedPrice) / price) * 100)}%
				</div>
			</div>
		</div>
	)
}
