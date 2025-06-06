'use client'

import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Product } from '@/entities/products'

import { DeleteProductButton } from '@/features/companyProducts/products-list/delete-product-button'

type Props = {
	product: Product
	onCloseAction: () => void
}

type UpdateProductInputs = {
	thumbnail?: FileList

	name: string
	categoryName: string
	expirationDate: Date
	quantity: number
	price: number
	discountPrice: number

	description: string
	composition: string

	calories: number
	proteins: number
	fats: number
	carbohydrates: number
}

export default function ProductModalEdit({ product, onCloseAction }: Props) {
	const { register, handleSubmit } = useForm<UpdateProductInputs>({
		defaultValues: {
			...product,
			thumbnail: undefined,
			expirationDate: new Date(product.expirationDate)
		}
	})

	const onUpdateProduct = (values: UpdateProductInputs) => {
		console.log(values)
	}

	return (
		<div className='fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto'>
				<header className='flex justify-between items-center p-4 border-b'>
					<h2 className='text-xl font-bold'>Редактировать продукт</h2>
					<button
						onClick={onCloseAction}
						className='bg-red-500 rounded-full px-2 text-gray-500 hover:text-gray-800'
						aria-label='Закрыть'
					>
						&times;
					</button>
				</header>

				<form
					onSubmit={handleSubmit(onUpdateProduct)}
					className='p-6 space-y-6'
				>
					{/* Изображение */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Изображение
						</label>
						<div className='flex items-center space-x-4'>
							<div className='w-24 h-24 bg-gray-100 rounded overflow-hidden relative'>
								<Image
									src={
										product.thumbnail ||
										'/images/placeholder/product-thumbnail.jpg'
									}
									alt={`${product.name} thumbnail`}
									sizes={'250px'}
									priority
									fill
									className='object-cover'
								/>
							</div>

							<input
								type='file'
								accept='image/*'
								className='text-sm'
							/>
						</div>
					</div>

					{/* Основные поля */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{[
							{
								label: 'Название',
								name: 'name' as const,
								type: 'text'
							},
							{
								label: 'Категория',
								name: 'categoryName' as const,
								type: 'text'
							},
							{
								label: 'Дата истечения',
								name: 'expirationDate' as const,
								type: 'datetime-local'
							},
							{
								label: 'Количество',
								name: 'quantity' as const,
								type: 'number'
							},
							{
								label: 'Цена',
								name: 'price' as const,
								type: 'number'
							},
							{
								label: 'Цена со скидкой',
								name: 'discountPrice' as const,
								type: 'number'
							}
						].map(({ name, label, type }) => (
							<fieldset
								className='border pl-4 rounded'
								key={name}
							>
								<legend className='block text-sm font-medium text-gray-700 mb-1'>
									{label}
								</legend>
								<input
									{...register(name)}
									name={name}
									type={type}
									className='w-full border-none outline-none rounded py-2'
								/>
							</fieldset>
						))}
					</div>

					{/* Описание и состав */}
					<fieldset className='border pl-4 rounded'>
						<legend className='block text-sm font-medium text-gray-700 mb-1'>
							Описание
						</legend>
						<textarea
							{...register('description')}
							rows={3}
							className='w-full border-none outline-none rounded py-2'
						/>
					</fieldset>
					<fieldset className='border pl-4 rounded'>
						<legend className='block text-sm font-medium text-gray-700'>
							Состав
						</legend>
						<input
							{...register('composition')}
							className='w-full border-none outline-none rounded py-2'
						/>
					</fieldset>

					{/* Пищевая ценность */}
					<fieldset className='border p-4 rounded space-y-4'>
						<legend className='text-sm font-medium text-gray-700'>
							Пищевая ценность
						</legend>
						<div className='grid grid-cols-2 gap-4'>
							{(
								[
									{ label: 'Калории', name: 'calories' },
									{ label: 'Белки', name: 'proteins' },
									{ label: 'Жиры', name: 'fats' },
									{ label: 'Углеводы', name: 'carbohydrates' }
								] as const
							).map(({ name, label }) => (
								<div key={name}>
									<label className='block text-sm text-gray-600 mb-1'>
										{label}
									</label>
									<input
										{...register(name)}
										type='number'
										className='w-full border rounded px-2 py-1'
									/>
								</div>
							))}
						</div>
					</fieldset>

					{/* Кнопки */}
					<div className='flex justify-between space-x-2'>
						<DeleteProductButton productId={product.id} />

						<div className={'flex gap-x-5'}>
							<button
								type='button'
								onClick={onCloseAction}
								className='px-4 py-2 border rounded hover:bg-gray-100'
							>
								Отмена
							</button>
							<button
								type='submit'
								className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
							>
								Сохранить
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
