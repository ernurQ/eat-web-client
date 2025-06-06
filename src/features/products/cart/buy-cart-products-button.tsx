'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { cn } from '@/shared/lib/classnames'

import {
	useBuyCartProductsMutation,
	useCartProductsQuery,
	useCartTotalPriceQuery
} from '@/entities/cart'

const SAVED_CARDS = [{ id: 'card1', brand: 'VISA', last4: '1234' }]

export function BuyCartProductsButton() {
	const { data: products } = useCartProductsQuery()
	const isEmpty = products?.length === 0
	const { data: price, isPending, isStale } = useCartTotalPriceQuery()
	const { isPending: isBuyProductsPending } = useBuyCartProductsMutation()

	const [showPaymentModal, setShowPaymentModal] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)

	const [uniqueCode, setUniqueCode] = useState('')
	const [timeLeft, setTimeLeft] = useState(0)

	const onBuyProducts = () => {
		setShowPaymentModal(true)
	}

	const disabled = isPending || isStale || isBuyProductsPending || isEmpty

	return (
		<div className='flex flex-col items-center py-10 gap-2'>
			<p>К оплате</p>
			<p className='text-[#F7C04F] font-bold text-xl'>{price} тг</p>
			<button
				onClick={onBuyProducts}
				disabled={disabled}
				className={cn(
					'bg-[#F7C04F] h-11 px-10 rounded',
					'flex justify-center items-center text-white font-bold',
					{ 'bg-gray-300': disabled }
				)}
			>
				Купить
			</button>

			{/* Payment Method Modal */}
			{showPaymentModal && price && (
				<PaymentMethodModal
					cards={SAVED_CARDS}
					onClose={() => setShowPaymentModal(false)}
					totalPrice={price}
					onPay={() => {
						setShowPaymentModal(false)
						setShowSuccessModal(true)

						const newUniqueCode = generateCode()
						setUniqueCode(newUniqueCode)
						setTimeLeft(3600)
						const cartData = localStorage.getItem('cart') || '[]'
						let cartItems: Array<any> = []
						try {
							cartItems = JSON.parse(cartData)
						} catch (e) {
							console.error('Error parsing cart data:', e)
						}

						const newOrder = {
							orderId: newUniqueCode,
							products: cartItems.map((item: any) => ({
								productId: item.id,
								productName: item.name,
								productImage: item.thumbnail,
								price: item.price,
								quantity: item.quantity,
								orderCode: newUniqueCode
							})),
							purchasedAt: new Date().toISOString(),
							expirationTime: Date.now() + 1000 * 3600
						}

						const existingOrdersStr =
							localStorage.getItem('orderedCart') || '[]'
						let existingOrders: any[] = []
						try {
							existingOrders = JSON.parse(existingOrdersStr)
						} catch (e) {
							console.error('Error parsing orderedCart data:', e)
						}

						// 4. Append the new order to the orders array
						existingOrders.push(newOrder)

						// 5. Save the updated orders array to localStorage under "orderedCart"
						localStorage.setItem('orderedCart', JSON.stringify(existingOrders))

						// 6. Remove the "cart" key to clear the shopping cart
						localStorage.removeItem('cart')
						// --- Order Processing End ---
					}}
				/>
			)}

			{/* Success Modal */}
			{showSuccessModal && (
				<SuccessModal
					code={uniqueCode}
					timeLeft={timeLeft}
					onClose={() => setShowSuccessModal(false)}
					onTick={() => setTimeLeft(0)}
				/>
			)}
		</div>
	)
}

/**
 * PaymentMethodModal: allows the user to select a saved card and pay.
 */
function PaymentMethodModal({
	cards,
	onClose,
	onPay,
	totalPrice
}: {
	cards: Array<{ id: string; brand: string; last4: string }>
	onClose: () => void
	onPay: (cardId: string) => void
	totalPrice: number
}) {
	const [selected, setSelected] = useState(cards[0]?.id || '')

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white rounded-lg p-6 w-full max-w-sm relative'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-xl text-gray-500 hover:text-black'
				>
					✖
				</button>
				<h2 className='text-lg font-semibold mb-4 text-center'>
					Выберите способ оплаты
				</h2>
				{cards.map((card) => (
					<label
						key={card.id}
						className='flex items-center gap-2 mb-3 border border-gray-200 p-2 rounded-xl cursor-pointer'
					>
						<span className='text-sm font-medium'>
							{card.brand} **{card.last4}
						</span>
						<input
							type='radio'
							name='selectedCard'
							value={card.id}
							checked={selected === card.id}
							onChange={() => setSelected(card.id)}
							className='ml-auto'
						/>
					</label>
				))}
				<div className='text-center mt-6'>
					<p className='text-[#F7C04F] font-bold text-xl mb-2'>
						{totalPrice} тг
					</p>
					<button
						onClick={() => onPay(selected)}
						className='bg-[#F7C04F] text-white py-2 px-6 rounded hover:bg-[#e0a42f]'
					>
						Оплатить
					</button>
				</div>
			</div>
		</div>
	)
}

function SuccessModal({
	code,
	timeLeft,
	onTick,
	onClose
}: {
	code: string
	timeLeft: number
	onTick: (cb: (newTime: number) => void) => void
	onClose: () => void
}) {
	useEffect(() => {
		const timer = setInterval(() => {
			onTick((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timer)
					return 0
				}
				return prevTime - 1
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [onTick])

	const formattedTime = formatSeconds(timeLeft)

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white rounded-lg p-6 w-full max-w-sm relative flex flex-col items-center'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-xl text-gray-500 hover:text-black'
				>
					✖
				</button>
				<h2 className='text-lg font-semibold mb-4 text-center'>
					Спасибо за покупку!
				</h2>
				<Image
					src='/images/payment/success-payment-image.png'
					alt='Success'
					className='w-32 h-32 mb-4 object-contain'
				/>
				<p className='mb-2'>Ваш код</p>
				<p className='text-2xl font-bold text-green-700 mb-6'>{code}</p>
				<p className='text-sm text-gray-600'>
					Время истечет через:{' '}
					<span className='text-red-500'>{formattedTime}</span>
				</p>
			</div>
		</div>
	)
}

/** Helper: Format seconds into "hh:mm:ss" or "mm:ss" if less than an hour */
function formatSeconds(seconds: number) {
	const h = Math.floor(seconds / 3600)
	const m = Math.floor((seconds % 3600) / 60)
	const s = seconds % 60
	const hh = h.toString().padStart(2, '0')
	const mm = m.toString().padStart(2, '0')
	const ss = s.toString().padStart(2, '0')
	return h > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
}

function generateCode() {
	return Math.floor(100000 + Math.random() * 900000).toString()
}
