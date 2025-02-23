'use client'

import { useEffect, useState } from 'react'

export function OrdersTab() {
	const [orders, setOrders] = useState<OrderData[]>([])
	

	useEffect(() => {
		const storedOrders = localStorage.getItem('orderedCart')
		if (storedOrders) {
			setOrders(JSON.parse(storedOrders))
		}
	}, [])

	if (!orders.length) {
		return <p>У вас нет заказов</p>
	}

	return (
		<div className='space-y-6'>
			<h3 className='text-lg font-semibold mb-4'>Мои заказы</h3>
			{orders.map((order, idx) => (
				<OrderItem
					key={idx}
					order={order}
				/>
			))}
		</div>
	)
}

interface OrderData {
	products: Array<{
		productId: string
		productName: string
		productImage: string
		price: number
		quantity: number
	}>
	purchasedAt: number
	expirationTime?: number
}

// Renders a single "order" which may have multiple products
function OrderItem({ order }: { order: OrderData }) {
	return (
		<div className='border p-4 rounded-md space-y-4'>
			{order.products.map((prod, index) => (
				<OrderProductRow
					key={index}
					product={prod}
					order={order}
				/>
			))}
			<div className='flex justify-end mt-4'>
				<p className='font-semibold'>
					Итого:{' '}
					{order.products.reduce((acc, p) => acc + p.price * p.quantity, 0)} тг
				</p>
			</div>
		</div>
	)
}

// Displays one product row: image, name, price, quantity, countdown
function OrderProductRow({
	product,
	order
}: {
	product: {
		productId: string
		productName: string
		productImage: string
		price: number
		quantity: number
	}
	order: OrderData
}) {
	const [timeLeft, setTimeLeft] = useState(0);
	const isTimeUp = timeLeft <= 0;


	useEffect(() => {
		if (!order.expirationTime) return
		const timer = setInterval(() => {
			const remain = order.expirationTime! - Date.now()
			if (remain <= 0) {
				setTimeLeft(0)
				clearInterval(timer)
			} else {
				setTimeLeft(remain)
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [order.expirationTime])

	const formattedTime = formatSeconds(Math.floor(timeLeft / 1000))

	return (
		<div className='flex justify-between items-center border-b pb-2 mb-2'>
			{/* Left side: product info */}
			<div className='flex items-center gap-4'>
				<img
					src={product.productImage}
					alt={product.productName}
					className={`w-16 h-16 object-cover rounded}`}
				/>
				<div>
					<p className='font-medium'>{product.productName}</p>
					<p>{product.price} тг</p>
					<p>{product.quantity} шт</p>
				</div>
			</div>

			{/* Right side: total & countdown */}
			<div className='text-right'>
				{order.expirationTime && timeLeft > 0 && (
					<>
						<p>Ваш код: {product.orderCode}</p>
						<p>
							Время истечет через:{' '}
							<span
								className={`${formattedTime > '30' ? 'text-green-600' : 'text-red-600'}`}
							>
								{formattedTime}
							</span>
						</p>
					</>
				)}
			</div>
		</div>
	)
}

// Convert seconds to "hh:mm:ss" or "mm:ss"
function formatSeconds(seconds: number) {
	const h = Math.floor(seconds / 3600)
	const m = Math.floor((seconds % 3600) / 60)
	const s = seconds % 60

	const hh = String(h).padStart(2, '0')
	const mm = String(m).padStart(2, '0')
	const ss = String(s).padStart(2, '0')

	if (h === 0) {
		return `${mm}:${ss}`
	}
	return `${hh}:${mm}:${ss}`
}