import Image from 'next/image'
import React from 'react'
import { ProductForm } from '../catalog/product-add'

interface DiscountStatus {
	isValid: boolean
	message: string
}

interface ProductModalProps {
	setModalOpen: (open: boolean) => void
	handleSubmit: (e: React.FormEvent) => void
	imagePreview?: string
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	form: ProductForm
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
	discountStatus: DiscountStatus
	discountPercent: number
}

export default function ProductModal({
	setModalOpen,
	handleSubmit,
	imagePreview,
	handleFileChange,
	form,
	handleChange,
	discountStatus,
	discountPercent
}: ProductModalProps) {
	return (
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
								name='expirationDate'
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
									['calories', 'proteins', 'fats', 'carbohydrates'] as Array<
										keyof ProductForm
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
											name={key}
											type='number'
											value={form[key] as number}
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
								<label className='block text-sm mb-1'>Цена (без скидки)</label>
								<input
									name='price'
									type='number'
									value={form.price}
									onChange={handleChange}
									className='w-full border rounded px-3 py-2'
									required
								/>
							</div>

							<div>
								<label className='block text-sm mb-1'>Цена (со скидкой)</label>
								<input
									name='discountPrice'
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
							{discountStatus.isValid ? (
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
        bg-red-100 text-red-800
        px-3 py-1
        rounded-full
        text-sm font-semibold
        transition
      '
								>
									{discountStatus.message}
								</span>
							)}
						</div>

						<div className='md:col-span-2 flex justify-end space-x-2 pt-4'>
							<button
								type='button'
								onClick={() => setModalOpen(false)}
								className='px-4 py-2 border rounded-full hover:bg-gray-100'
							>
								Отменить
							</button>
							<button
								type='submit'
								className='px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600'
							>
								Добавить продукт
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
