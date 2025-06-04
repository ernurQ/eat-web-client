'use client'

import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useState } from 'react'

import { Product } from '@/entities/products'

type Props = {
	product: Product
	onClose: () => void
}

export default function ProductModalEdit({ product, onClose }: Props) {
	const [form, setForm] = useState<Product>(product)
	const [preview, setPreview] = useState<string>(product.thumbnail)

	const handleTextChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setForm(
			(prev) =>
				({
					...prev,
					[name]: value
				}) as any
		)
	}

	const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(
			(prev) =>
				({
					...prev,
					[name]: Number(value)
				}) as any
		)
	}

	const handleNutritionChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm((prev) => ({
			...prev,
			nutrition: {
				...prev.nutrition,
				[name]: Number(value)
			}
		}))
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const url = URL.createObjectURL(file)
			setPreview(url)
			setForm((prev) => ({
				...prev,
				thumbnail: url
			}))
		}
	}

	w

	return (
		<div className='fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto'>
				<header className='flex justify-between items-center p-4 border-b'>
					<h2 className='text-xl font-bold'>Редактировать продукт</h2>
					<button
						onClick={onClose}
						className='bg-red-500 rounded-full text-white px-2 text-gray-500 hover:text-gray-800'
						aria-label='Закрыть'
					>
						&times;
					</button>
				</header>

				<form
					onSubmit={handleSubmit}
					className='p-6 space-y-6'
				>
					{/* Изображение */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Изображение
						</label>
						<div className='flex items-center space-x-4'>
							<div className='w-24 h-24 bg-gray-100 rounded overflow-hidden'>
								<Image
									src={preview}
									alt={form.name}
									width={96}
									height={96}
									className='object-cover'
								/>
							</div>
							<input
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								className='text-sm'
							/>
						</div>
					</div>

					{/* Основные поля */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{[
							{ label: 'Название', name: 'name', type: 'text' },
							{ label: 'Категория', name: 'category', type: 'text' },
							{ label: 'Вес', name: 'weight', type: 'text' },
							{ label: 'Дата истечения', name: 'expirationDate', type: 'date' },
							{ label: 'Цена', name: 'price', type: 'number' },
							{
								label: 'Цена со скидкой',
								name: 'discountedPrice',
								type: 'number'
							},
							{ label: 'Макс. количество', name: 'maxQuantity', type: 'number' }
						].map((f) => (
							<fieldset
								key={f.name}
								className='border rounded pl-4'
							>
								<legend className='block text-sm font-medium text-gray-700 mb-[-5px]'>
									{f.label}
								</legend>
								<input
									name={f.name}
									type={f.type}
									value={(form as any)[f.name]}
									onChange={
										f.type === 'number' ? handleNumberChange : handleTextChange
									}
									className='w-full border-none outline-none rounded py-2 bg-transparent'
								/>
							</fieldset>
						))}
					</div>

					{/* Описание и состав */}
					<fieldset className='border rounded pl-4'>
						<legend className='block text-sm font-medium text-gray-700 mb-1'>
							Описание
						</legend>
						<textarea
							name='description'
							value={form.description}
							onChange={handleTextChange}
							rows={3}
							className='w-full border-none outline-none rounded py-2'
						/>
					</fieldset>

					<fieldset className='border rounded pl-4'>
						<legend className='block text-sm font-medium text-gray-700 mb-1'>
							Состав
						</legend>
						<input
							name='composition'
							value={form.composition}
							onChange={handleTextChange}
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
							).map((n) => (
								<div key={n.name}>
									<label className='block text-sm text-gray-600 mb-1'>
										{n.label}
									</label>
									<input
										name={n.name}
										type='number'
										value={(form.nutrition as any)[n.name] ?? 0}
										onChange={handleNutritionChange}
										className='w-full border rounded px-2 py-1'
									/>
								</div>
							))}
						</div>
					</fieldset>

					{/* Кнопки */}
					<div className='flex justify-between space-x-2'>
						<button
							type='button'
							className='bg-red-500 text-white px-4 py-2 border hover:bg-red-900 rounded-full'
						>
							Удалить продукт
						</button>
						<div className='flex gap-4'>
							<button
								type='button'
								onClick={onClose}
								className='px-4 py-2 border rounded-full hover:bg-gray-100'
							>
								Отмена
							</button>
							<button
								type='submit'
								className='px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700'
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
