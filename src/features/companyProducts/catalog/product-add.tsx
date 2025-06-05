import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { addProductOptions, invalidateProductsQuery } from '@/entities/products'

type AddProductInputs = {
	name: string
	description: string
	categoryName: string
	expirationDate: string
	composition: string
	quantity: number
	calories: number
	proteins: number
	fats: number
	carbohydrates: number
	price: number
	discountPrice: number
	thumbnail?: FileList
}

export default function ProductAdd() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { register, handleSubmit, watch, reset } = useForm<AddProductInputs>()

	const { mutate: addProduct, isPending } = useMutation({
		...addProductOptions(),
		onMutate: () => {
			toast.loading('Добавляем продукт', { id: 'add-product-loading' })
		},
		onSettled: () => {
			toast.dismiss('add-product-loading')
		},
		onError: () => {
			toast.error('Что-то пошло не так')
		},
		onSuccess: async () => {
			toast.success('Продукт был добавлен')
			await invalidateProductsQuery()
			setIsModalOpen(false)
			reset()
		}
	})

	const onAddProduct = (values: AddProductInputs) => {
		const thumbnail = values.thumbnail?.item(0)
		if (!thumbnail) return
		addProduct({
			...values,
			expirationDate: new Date(values.expirationDate).toISOString(),
			thumbnail
		})
	}

	const price = watch('price')
	const discountPrice = watch('discountPrice')
	const discountPercent =
		price > 0 ? Math.round(((price - discountPrice) / price) * 100) : 0
	const isValidDiscount = discountPercent > 0 && discountPercent < 100

	return (
		<div className='p-4'>
			<button
				onClick={() => setIsModalOpen(true)}
				className='mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded'
			>
				Добавить продукт
			</button>

			{isModalOpen && (
				<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
					<div className='bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 my-4 max-h-[90vh] overflow-auto relative'>
						{/* Close button */}
						<button
							onClick={() => setIsModalOpen(false)}
							className='absolute bg-red-500 rounded-full px-1 text-white top-2 right-2 hover:text-gray-800 text-2xl leading-none'
						>
							&times;
						</button>

						<form
							onSubmit={handleSubmit(onAddProduct)}
							className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'
						>
							{/* Left: Image upload & preview */}
							<div>
								<label
									htmlFor='imageFile'
									className='relative w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50'
								>
									{watch('thumbnail')?.length !== 0 ? (
										<Image
											src={'/images/placeholder/product-thumbnail.jpg'}
											alt='Preview'
											className='object-contain h-full'
											fill
											sizes={'300px'}
										/>
									) : (
										<span className='text-gray-400'>Загрузите картинку</span>
									)}
								</label>
								<input
									{...register('thumbnail', { required: true })}
									id='imageFile'
									type='file'
									accept='image/*'
									className='hidden'
								/>
							</div>

							{/* Right: Text inputs */}
							<div className='space-y-4'>
								<div>
									<label className='block text-sm mb-1'>Название</label>
									<input
										{...register('name', { required: true })}
										className='w-full border rounded px-3 py-2'
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>Описание</label>
									<textarea
										{...register('description', { required: true })}
										className='w-full border rounded px-3 py-2'
										rows={2}
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>Категория</label>
									<input
										{...register('categoryName', { required: true })}
										className='w-full border rounded px-3 py-2'
										required
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>Дата истечения</label>
									<input
										{...register('expirationDate', { required: true })}
										type='date'
										className='w-full border rounded px-3 py-2'
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>Состав</label>
									<textarea
										{...register('composition')}
										className='w-full border rounded px-3 py-2'
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>Количество</label>
									<input
										{...register('quantity')}
										type='number'
										min='1'
										className='w-full border rounded px-3 py-2'
										required
									/>
								</div>

								<div>
									<div className='grid grid-cols-2 gap-2'>
										{[
											{
												name: 'calories' as const,
												label: 'Калории'
											},
											{
												name: 'proteins' as const,
												label: 'Протеин'
											},
											{
												name: 'fats' as const,
												label: 'Жиры'
											},
											{
												name: 'carbohydrates' as const,
												label: 'Углеводы'
											}
										].map(({ name, label }) => (
											<div key={name}>
												<label className='text-xs capitalize block mb-1'>
													{label}
												</label>
												<input
													{...register(name)}
													type='number'
													className='w-full border rounded px-2 py-1 text-sm text-gray-800 bg-white'
													min={0}
												/>
											</div>
										))}
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm mb-1'>Цена</label>
										<input
											{...register('price')}
											type='number'
											className='w-full border rounded px-3 py-2'
											required
										/>
									</div>

									<div>
										<label className='block text-sm mb-1'>
											Цена со скидкой
										</label>
										<input
											{...register('discountPrice')}
											type='number'
											className='w-full border rounded px-3 py-2'
											required
										/>
									</div>
								</div>

								<div
									className='flex justify-center items-center my-4'
									aria-live='polite'
								>
									{isValidDiscount ? (
										<span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semiboldtransition'>
											−{discountPercent}%
										</span>
									) : (
										<span className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold transition'>
											Неверная скидка
										</span>
									)}
								</div>

								<div className='md:col-span-2 flex justify-end space-x-2 pt-4'>
									<button
										type='button'
										onClick={() => setIsModalOpen(false)}
										className='px-4 py-2 border rounded hover:bg-gray-100'
									>
										Отменить
									</button>
									<button
										disabled={isPending}
										type='submit'
										className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
									>
										Добавить продукт
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
