import { useQuery } from '@tanstack/react-query'
import { Modal } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { routes } from '@/shared/config/routes'

import { productInfoOptions } from '@/entities/products'

type Props = {
	productId: string
}

export function AddToCartButton({ productId }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className={
					'text-sm outline-none bg-[#F7C04F] h-11 w-24 flex justify-center items-center rounded text-white hover:bg-[#ba903c] transition-colors ease-in-out duration-300'
				}
			>
				Добавить в корзину
			</button>

			<Modal
				title={'Добавить в корзину'}
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
				centered
				width={600}
			>
				<AddToCartForm productId={productId} />
			</Modal>
		</>
	)
}

function AddToCartForm({ productId }: Props) {
	const [isThumbnailError, setIsThumbnailError] = useState(false)
	const [quantity, setQuantity] = useState(1)
	const handleDecrement = () => setQuantity((value) => value - 1)
	const handleIncrement = () => setQuantity((value) => value + 1)

	const { data, isPending, isError } = useQuery(
		productInfoOptions({
			productId
		})
	)

	const onAddToCart = () => {}

	if (isPending) {
		return <p>Загрузка...</p>
	}

	if (isError) {
		return <p>Что то пошло нет так</p>
	}

	return (
		<div className='overflow-y-auto max-h-[80vh] w-full'>
			<div className={'flex gap-x-10'}>
				<div className='relative w-44 h-44'>
					<Image
						src={
							isThumbnailError
								? '/images/placeholder/product-thumbnail.jpg'
								: data.thumbnail
						}
						onError={() => setIsThumbnailError(true)}
						alt={'Product thumbnail'}
						fill
						className='object-cover rounded'
						unoptimized
					/>
				</div>
				<div className={'grow'}>
					<h2 className='text-2xl font-bold'>{data.name}</h2>
					<Link
						href={routes.branch.profile(data.branchId)}
						className='text-green-700 font-semibold'
					>
						{data.branchName}
					</Link>
					<p className='text-sm text-gray-600'>
						Оставшееся количество: {data.quantity}
					</p>
					<p className='text-sm text-gray-600'>
						Истекает в:{' '}
						{new Date(data.expirationDate).toLocaleString('ru-RU', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</p>

					<p className='text-sm text-gray-600'>Цена: {data.price}</p>
					<p className='text-sm text-gray-600'>
						Цена со скидкой: {data.discountPrice}
					</p>
				</div>
			</div>

			<p className='text-gray-700 mt-5'>{data.description}</p>
			<p>Состав: {data.composition}</p>

			<div className='flex justify-between items-center mt-5'>
				<div className='flex items-center space-x-4'>
					<button
						onClick={handleDecrement}
						disabled={quantity <= 1}
						className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded'
					>
						−
					</button>
					<span className='font-semibold w-6 text-center'>{quantity}</span>
					<button
						onClick={handleIncrement}
						disabled={quantity >= data.quantity}
						className={
							'px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white'
						}
					>
						+
					</button>
				</div>

				<p className={'text-base'}>
					Итоговая цена:{' '}
					<span className={'text-lg text-yellow-700'}>
						{quantity * data.discountPrice}
					</span>
				</p>

				<button
					onClick={onAddToCart}
					className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded'
				>
					Добавить в корзину
				</button>
			</div>
		</div>
	)
}
