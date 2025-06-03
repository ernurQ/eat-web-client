// components/ProductAdd.tsx
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface KBJU {
	calories: number
	protein: number
	fat: number
	carbs: number
}

interface ProductForm {
	imageFile?: File
	name: string
	description: string
	expiryDate: string
	composition: string
	kbju: KBJU
	priceOriginal: string
	priceDiscounted: string
}

export default function ProductAdd() {
	const [modalOpen, setModalOpen] = useState(false)
	const [form, setForm] = useState<ProductForm>({
		name: '',
		description: '',
		expiryDate: '',
		composition: '',
		kbju: { calories: 0, protein: 0, fat: 0, carbs: 0 },
		priceOriginal: '',
		priceDiscounted: ''
	})
	const discountPercent = Math.round(
		((Number(form.priceOriginal) - Number(form.priceDiscounted)) /
			Number(form.priceOriginal)) *
			100
	)
	const isValidDiscount = discountPercent > 0 && discountPercent < 100
	const [imagePreview, setImagePreview] = useState<string>()

	// Type‐guard for KBJU fields
	const isKBJUKey = (key: string): key is keyof KBJU =>
		['calories', 'protein', 'fat', 'carbs'].includes(key)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		if (isKBJUKey(name)) {
			// update nested kbju object
			setForm((prev) => ({
				...prev,
				kbju: {
					...prev.kbju,
					[name]: Number(value)
				}
			}))
		} else {
			// update top-level string fields
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
		console.log('Submitting product:', form)
		// TODO: send `form` and `form.imageFile` to your API
		setModalOpen(false)
	}

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
									<label className='block text-sm mb-1'>Дата истечения</label>
									<input
										name='expiryDate'
										type='date'
										value={form.expiryDate}
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
									<p className='block text-sm mb-1'>КБЖУ (необязательно)</p>
									<div className='grid grid-cols-4 gap-2'>
										{(
											['calories', 'protein', 'fat', 'carbs'] as Array<
												keyof KBJU
											>
										).map((key) => (
											<div key={key}>
												<label className='text-xs capitalize block mb-1'>
													{key === 'calories'
														? 'К'
														: key === 'protein'
															? 'Б'
															: key === 'fat'
																? 'Ж'
																: 'У'}
												</label>
												<input
													name={key}
													type='number'
													value={form.kbju[key]}
													onChange={handleChange}
													className='w-full border rounded px-2 py-1 text-sm'
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
											value={form.priceOriginal}
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
											value={form.priceDiscounted}
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
									{isValidDiscount   ? (
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
										Добавить продукта
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
