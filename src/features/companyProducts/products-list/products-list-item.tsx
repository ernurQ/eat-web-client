'use client'

import Image from 'next/image'
import React, { useMemo, useState } from 'react'

import { cn } from '@/shared/lib/classnames'

import { Product } from '@/entities/products'

import ProductModalEdit from './ProductModalEdit'

type Props = { product: Product }

export function ProductsListItem({ product }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [thumbnail, setThumbnail] = useState(product.thumbnail)

	const discountPercent = useMemo(() => {
		const dp = product.discountPrice ?? 0
		if (product.price > dp && dp > 0) {
			return Math.round(((product.price - dp) / product.price) * 100)
		}
		return 0
	}, [product.price, product.discountPrice])

	return (
		<>
			<li
				className={cn(
					'w-64 mx-auto bg-white rounded-lg shadow-md overflow-hidden',
					'flex flex-col'
				)}
			>
				<button
					onClick={() => setIsModalOpen(true)}
					aria-label={`Открыть детали ${product.name}`}
					className='relative h-48 w-full'
				>
					<Image
						src={thumbnail}
						onError={() =>
							setThumbnail('/images/placeholder/product-thumbnail.jpg')
						}
						sizes={'250px'}
						priority
						alt={product.name}
						fill
						className='object-cover'
						unoptimized
					/>
				</button>

				<div className='p-4 flex-1'>
					<h3
						onClick={() => setIsModalOpen(true)}
						className='text-lg font-semibold text-gray-800 hover:text-green-700 cursor-pointer'
					>
						{product.name}
					</h3>
					<p className='text-sm text-gray-600 mt-1'>{product.categoryName}</p>
				</div>

				<div className='px-4 py-2 flex flex-col-reverse'>
					<button
						onClick={() => setIsModalOpen(true)}
						className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full my-2'
					>
						Изменить
					</button>
					<div className='flex'>
						<span>Оставшееся количество: {product.quantity}</span>
						<Price
							price={product.price}
							discountedPrice={product.discountPrice}
							discountPercent={discountPercent}
						/>
					</div>
				</div>
			</li>

			{isModalOpen && (
				<ProductModalEdit
					product={product}
					onCloseAction={() => setIsModalOpen(false)}
				/>
			)}
		</>
	)
}

type PriceProps = {
	price: number
	discountedPrice?: number
	discountPercent: number
}

function Price({ price, discountedPrice, discountPercent }: PriceProps) {
	const dp = discountedPrice ?? 0

	if (discountPercent === 0) {
		return (
			<div className='border-2 border-green-600 text-green-800 px-3 py-1 rounded font-bold'>
				{price.toLocaleString()} ₸
			</div>
		)
	}

	return (
		<div className=''>
			<div className='font-bold text-green-800'>{dp.toLocaleString()} ₸</div>
			<div className='flex items-center text-sm text-red-600'>
				<span className='line-through mr-1 text-nowrap'>
					{price.toLocaleString()} ₸
				</span>
				<span className='bg-red-100 px-1 rounded-full'>
					−{discountPercent}%
				</span>
			</div>
		</div>
	)
}
