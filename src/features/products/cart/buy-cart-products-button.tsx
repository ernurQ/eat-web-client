'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { cn } from '@/shared/lib/classnames'

import { buyCartProducts } from '@/entities/cart'
import {
	getCartOptions,
	invalidateGetCartQuery
} from '@/entities/cart/get-cart'

export function BuyCartProductsButton() {
	const { data: products, isPending } = useQuery(getCartOptions())

	const { mutate, isPending: isBuyCartPending } = useMutation({
		mutationFn: () => buyCartProducts(),
		onSuccess: async () => {
			await invalidateGetCartQuery()
		}
	})

	const isEmpty = products?.products?.length === 0

	const disabled = isPending || isEmpty || isBuyCartPending

	const onBuyProducts = () => {
		mutate()
	}

	return (
		<div className='flex flex-col items-center py-10 gap-2'>
			<p>К оплате</p>
			<p className='text-[#F7C04F] font-bold text-xl'>
				{products?.totalPriceWithDiscount} тг
			</p>
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
		</div>
	)
}
