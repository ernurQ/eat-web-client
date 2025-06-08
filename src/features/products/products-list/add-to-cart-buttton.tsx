import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { routes } from '@/shared/config/routes'

import { productInfoOptions } from '@/entities/products'
import { addToCartOptions } from '@/entities/products/cart'
import GoogleMap from '@/features/geocoding/Geocoding'

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
				<AddToCartForm
					productId={productId}
					onClose={() => setIsModalOpen(false)}
				/>
			</Modal>
		</>
	)
}

function AddToCartForm({
	productId,
	onClose
}: Props & { onClose: () => void }) {
	const queryClient = useQueryClient()
  const { data: product, isLoading: isProductLoading, isError: isProductError } =
    useQuery(productInfoOptions({ productId }))

  const [isThumbnailError, setIsThumbnailError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const {
		isPending,
		isError,
		error,
		mutate: handleAddToCart
	} = useMutation({	
		...addToCartOptions(),
		onMutate: () => {
			toast.loading('Добавляем товар в корзину…', { id: 'add-to-cart' })
		},
		onSettled: () => {
			toast.dismiss('add-to-cart')
		},
		onError: () => {
			toast.error('Не удалось добавить в корзину', {
				id: 'add-to-cart'
			})
		},
		onSuccess: () => {
			toast.success('Товар успешно добавлен!', { id: 'add-to-cart' })
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			onClose()
		}
	})

	if (isProductLoading) return <p>Загрузка товара…</p>
	if (isProductError || !product) {
		console.log(isProductError);
		
		return <p>Не удалось загрузить данные товара</p>
	}

	const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1))
	const handleIncrement = () =>
		setQuantity((q) => Math.min(product.quantity, q + 1))

	const onAddToCart = () => {
		handleAddToCart({ productId, quantity })
	}

	if (isPending) {
		return <p>Загрузка...</p>
	}

	if (isError) {
		console.log(error);
		
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
								: product.thumbnail
						}
						onError={() => setIsThumbnailError(true)}
						alt={'Product thumbnail'}
						fill
						className='object-cover rounded'
						unoptimized
					/>
				</div>
				<div className={'grow'}>
					<h2 className='text-2xl font-bold'>{product.name}</h2>
					<Link
						href={routes.branch.profile(product.branchId)}
						className='text-green-700 font-semibold'
					>
						{product.branchName}
					</Link>
					<p className='text-sm text-gray-600'>
						Оставшееся количество: {product.quantity}
					</p>
					<p className='text-sm text-gray-600'>
						Истекает в:{' '}
						{new Date(product.expirationDate).toLocaleString('ru-RU', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</p>

					<p className='text-sm text-gray-600'>Цена: {product.price}</p>
					<p className='text-sm text-gray-600'>
						Цена со скидкой: {product.discountPrice}
					</p>
				</div>
			</div>

			<p className='text-gray-700 mt-5'>{product.description}</p>
			<p>Состав: {product.composition}</p>

			<GoogleMap branchName={product.branchName} branchLocation={product.branchLocation} lng={product.branchLocationGeo.coordinates[0]} lat={product.branchLocationGeo.coordinates[1]} />

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
						disabled={quantity >= product.quantity}
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
						{quantity * product.discountPrice}
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
