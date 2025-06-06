'use client'

import React from 'react'

interface ProductModalProps {
	productId: string
	onCloseAction: () => void
}

export default function ProductModal({}: ProductModalProps) {
	const handleFirstAdd = () => {}

	const handleIncrement = () => {}

	const handleDecrement = () => {}

	const handleFinal = () => {}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4'>
			<div className='bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh] w-full max-w-5xl flex flex-col'>
				<button
					className='absolute top-4 right-4 text-gray-600 hover:text-black text-2xl'
					aria-label='Close'
				>
					×
				</button>

				<div className='flex flex-col md:flex-row'>
					{/* Left: product image & details */}
					<div className='md:w-1/2 p-6 space-y-6'>
						<div className='relative w-full h-64'>
							{/*<Image*/}
							{/*	src={product.thumbnail}*/}
							{/*	alt={product.name}*/}
							{/*	fill*/}
							{/*	className='object-cover rounded'*/}
							{/*/>*/}
						</div>
						{/*<h2 className='text-2xl font-bold'>{product.name}</h2>*/}
						<p className='text-green-700 font-semibold'>{'branch name'}</p>
						<p className='text-gray-700'>{'description'}</p>

						<div className='space-y-4'>
							<button
								onClick={handleFirstAdd}
								className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded'
							>
								Добавить в корзину
							</button>

							<div className='flex items-center space-x-4'>
								<button
									onClick={handleDecrement}
									className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded'
								>
									−
								</button>
								<span className='font-semibold'>{'quantity'}</span>
								<button
									onClick={handleIncrement}
									className={
										'px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white'
									}
								>
									+
								</button>
								<button
									onClick={handleFinal}
									className='bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded'
								>
									Добавить
								</button>
							</div>

							{/*<p className='font-semibold'>Общая сумма: {totalPrice}</p>*/}
							<p className='text-sm text-gray-600'>
								Оставшееся количество: {'max quantity'}
							</p>
							<p className='text-sm text-gray-600'>Истекает в: {'date'}</p>
							<p>
								<span className='font-semibold'>Состав:</span> {'composition'}
							</p>
						</div>
					</div>

					<div className='md:w-1/2 h-96 p-4'></div>
				</div>
			</div>
		</div>
	)
}
