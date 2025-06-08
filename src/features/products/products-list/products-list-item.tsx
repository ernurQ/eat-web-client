'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'

import { AddToCartButton } from '@/features/products/products-list/add-to-cart-buttton'
import { AddToFavoritesButton } from '@/features/products/products-list/add-to-favorites-button'

import { getDistance } from '../catalog/get-distance'

import { ListItem } from './types'

type Props = {
	product: ListItem
	isFavorite?: boolean
	location?: { lat: number; lng: number }
}

type PriceProps = {
	price: number
	discountedPrice: number
}

export function ProductsListItem({ product, isFavorite, location }: Props) {
	const [thumbnail, setThumbnail] = useState(product.thumbnail)
	const distance =
		location &&
		product.branchLocationGeo?.coordinates &&
		product.branchLocationGeo.coordinates.length === 2
			? getDistance(
					location.lat,
					location.lng,
					product.branchLocationGeo.coordinates[1],
					product.branchLocationGeo.coordinates[0]
				)
			: null

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
							unoptimized
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

					<div className='flex mt-3 justify-between items-start gap-2 text-sm sm:text-base'>
						<div className='flex flex-col gap-1 max-w-[75%]'>
							<h3 className='font-semibold leading-tight text-gray-800 line-clamp-2 break-words'>
								{product.name}
							</h3>

							{product.categoryName && (
								<span className='text-gray-500 text-xs sm:text-sm'>
									{product.categoryName}
								</span>
							)}

							{distance !== null && (
								<span className='text-gray-400 text-xs sm:text-sm'>
									{distance.toFixed(2)} км от вас
								</span>
							)}

							{product.branchId && (
								<Link
									href={routes.branch.profile(product.branchId)}
									className='text-green-600 hover:underline text-xs sm:text-sm'
								>
									{product.branchName}, {product.branchLocation}
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
					<AddToCartButton productId={product.id} />

					<Price
						price={product.price}
						discountedPrice={product.discountPrice ?? 0}
					/>
				</div>
			</li>
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
