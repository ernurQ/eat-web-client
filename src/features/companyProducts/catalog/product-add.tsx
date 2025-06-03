// components/ProductAdd.tsx
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface KBJU {
	calories: number
	proteins: number
	fats: number
	carbohydrates: number
}

interface ProductForm {
	imageFile?: File
	name: string
	description: string
	expirationDate: string
	composition: string
	quantity: number
	kbju: KBJU
	price: number
	discountPrice: number
	categoryName: string
}

export default function ProductAdd() {
	const [modalOpen, setModalOpen] = useState(false)
	const [form, setForm] = useState<ProductForm>({
		name: '',
		description: '',
		expirationDate: '',
		composition: '',
		quantity: 0,
		kbju: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
		price: 0,
		discountPrice: 0,
		categoryName: '',
	})

	const discountPercent =
		form.price > 0
			? Math.round(
					((form.price - form.discountPrice) / form.price) *
						100
				)
			: 0

	const isValidDiscount = discountPercent > 0 && discountPercent < 100
	const [imagePreview, setImagePreview] = useState<string>()

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		// Handle nested KBJU fields
		if (name.startsWith('kbju.')) {
			const field = name.split('.')[1] as keyof KBJU
			setForm((prev) => ({
				...prev,
				kbju: {
					...prev.kbju,
					[field]: value === '' ? 0 : Number(value)
				}
			}))
		} else {
			// Handle top-level fields
			const key = name as Exclude<keyof ProductForm, 'kbju' | 'imageFile'>
			setForm((prev) => ({
				...prev,
				[key]: value
			}))
		}
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setForm((prev) => ({ ...prev, imageFile: file }))
			setImagePreview(URL.createObjectURL(file))
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (!form.name || !form.expirationDate || !form.price) {
			alert('Please fill all required fields')
			return
		}

		if (Number(form.discountPrice) >= Number(form.price)) {
			alert('Discounted price must be lower than original price')
			return
		}

		console.log('Submitting product:', form)
		setModalOpen(false)
	}

	useEffect(() => {
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview)
			}
		}
	}, [imagePreview])

	return (
		<div className='p-4'>
			<button
				onClick={() => setModalOpen(true)}
				className='mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded'
			>
				Добавить продукта
			</button>

			{modalOpen && (
				<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
					<div className='bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 my-4 max-h-[90vh] overflow-auto relative'>
						{/* Close button */}
						<button
							onClick={() => setModalOpen(false)}
							className='absolute bg-red-500 rounded-full px-1 text-white top-2 right-2 hover:text-gray-800 text-2xl leading-none'
						>
							&times;
						</button>

						<form
							onSubmit={handleSubmit}
							className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'
						>
							{/* Left: Image upload & preview */}
							<div>
								<label
									htmlFor='imageFile'
									className='block w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50'
								>
									{imagePreview ? (
										<Image
											src={imagePreview}
											alt='Preview'
											className='object-contain h-full'
										/>
									) : (
										<span className='text-gray-400'>Загрузите картинку</span>
									)}
								</label>
								<input
									id='imageFile'
									name='imageFile'
									type='file'
									accept='image/*'
									onChange={handleFileChange}
									className='hidden'
								/>
							</div>

							{/* Right: Text inputs */}
							<div className='space-y-4'>
								<div>
									<label className='block text-sm mb-1'>Название</label>
									<input
										name='name'
										value={form.name}
										onChange={handleChange}
										className='w-full border rounded px-3 py-2'
										required
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>Описание</label>
									<textarea
										name='description'
										value={form.description}
										onChange={handleChange}
										className='w-full border rounded px-3 py-2'
										rows={2}
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>Категория</label>
									<input
										name='categoryName'
										value={form.categoryName}
										onChange={handleChange}
										className='w-full border rounded px-3 py-2'
										required
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>Дата истечения</label>
									<input
										name='expiryDate'
										type='date'
										value={form.expirationDate}
										onChange={handleChange}
										className='w-full border rounded px-3 py-2'
										required
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>
										Состав (необязательно)
									</label>
									<input
										name='composition'
										value={form.composition}
										onChange={handleChange}
										className='w-full border rounded px-3 py-2'
									/>
								</div>

								<div>
									<label className='block text-sm mb-1'>
										Количество (обязательно)
									</label>
									<input
										type='number'
										name='quantity'
										value={form.quantity || ''}
										onChange={handleChange}
										min='1'
										className='w-full border rounded px-3 py-2'
										required
									/>
								</div>

								<div>
									<p className='block text-sm mb-1'>КБЖУ (необязательно)</p>
									<div className='grid grid-cols-4 gap-2'>
										{(
											['calories', 'protein', 'fat', 'carbohydrates'] as Array<
												keyof KBJU
											>
										).map((key) => (
											<div key={key}>
												<label className='text-xs capitalize block mb-1'>
													{key === 'calories'
														? 'К'
														: key === 'proteins'
															? 'Б'
															: key === 'fats'
																? 'Ж'
																: 'У'}
												</label>
												<input
													name={`kbju.${key}`}
													type='number'
													value={form.kbju[key] ?? 0}
													onChange={handleChange}
													className='w-full border rounded px-2 py-1 text-sm text-gray-800 bg-white'
													min={0}
												/>
											</div>
										))}
									</div>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm mb-1'>
											Цена (без скидки)
										</label>
										<input
											name='priceOriginal'
											type='number'
											value={form.price}
											onChange={handleChange}
											className='w-full border rounded px-3 py-2'
											required
										/>
									</div>

									<div>
										<label className='block text-sm mb-1'>
											Цена (со скидкой)
										</label>
										<input
											name='priceDiscounted'
											type='number'
											value={form.discountPrice}
											onChange={handleChange}
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
										<span
											className='
            bg-green-100 text-green-800 
            px-3 py-1 
            rounded-full 
            text-sm font-semibold
            transition
          '
										>
											−{discountPercent}%
										</span>
									) : (
										<span
											className='
            bg-yellow-100 text-yellow-800 
            px-3 py-1 
            rounded-full 
            text-sm font-semibold
            transition
          '
										>
											Неверная скидка
										</span>
									)}
								</div>

								<div className='md:col-span-2 flex justify-end space-x-2 pt-4'>
									<button
										type='button'
										onClick={() => setModalOpen(false)}
										className='px-4 py-2 border rounded hover:bg-gray-100'
									>
										Отменить
									</button>
									<button
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
