import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import ProductModal from '../products-list/ProductModal'

export interface ProductForm {
	imageFile?: File
	name: string
	description: string
	expirationDate: string
	composition: string
	quantity: number
	calories: number
	proteins: number
	fats: number
	carbohydrates: number
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
		calories: 0,
		proteins: 0,
		fats: 0,
		carbohydrates: 0,
		price: 0,
		discountPrice: 0,
		categoryName: ''
	})

	const [imagePreview, setImagePreview] = useState<string>()

	// Calculate discount percentage
	const discountPercent =
		form.price > 0
			? Math.round(((form.price - form.discountPrice) / form.price) * 100)
			: 0

	// Enhanced discount validation
	const getDiscountStatus = () => {
		if (form.price === 0 || form.discountPrice === 0) {
			return { isValid: false, message: 'Цены не могут быть нулевыми' }
		}
		if (form.discountPrice >= form.price) {
			return { isValid: false, message: 'Скидка должна быть меньше цены' }
		}
		if (discountPercent <= 0 || discountPercent >= 100) {
			return { isValid: false, message: 'Скидка должна быть от 1% до 99%' }
		}
		return { isValid: true, message: `−${discountPercent}%` }
	}

	const discountStatus = getDiscountStatus()

	const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target

  // These fields should be stored as numbers
  const numericFields: Array<keyof ProductForm> = [
    'quantity',
    'calories',
    'proteins',
    'fats',
    'carbohydrates',
    'price',
    'discountPrice'
  ]

  if (numericFields.includes(name as keyof ProductForm)) {
    setForm(prev => ({
      ...prev,
      [name]: value === '' ? 0 : Number(value)
    }))
  } else {
    setForm(prev => ({
      ...prev,
      [name]: value
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

		// Validate required fields
		if (!form.name || !form.expirationDate || !form.price) {
			alert('Пожалуйста, заполните все обязательные поля')
			return
		}

		// Validate discount
		if (!discountStatus.isValid) {
			alert(discountStatus.message)
			return
		}

		console.log('Submitting product:', form)
		setModalOpen(false)
	}

	// Clean up image preview URL
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
				className='mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full'
			>
				Добавить продукт
			</button>

			{modalOpen && (
				<ProductModal
					setModalOpen={setModalOpen}
					handleSubmit={handleSubmit}
					imagePreview={imagePreview}
					handleFileChange={handleFileChange}
					form={form}
					handleChange={handleChange}
					discountStatus={discountStatus}
					discountPercent={discountPercent}
				/>
			)}
		</div>
	)
}
