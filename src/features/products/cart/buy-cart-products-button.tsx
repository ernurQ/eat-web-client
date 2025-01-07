import { cn } from '@/shared/lib/classnames'

import {
	useBuyCartProductsMutation,
	useCartProductsQuery,
	useCartTotalPriceQuery
} from '@/entities/cart'

export function BuyCartProductsButton() {
	const { data: products } = useCartProductsQuery()
	const isEmpty = products?.length === 0
	const { data: price, isPending, isStale } = useCartTotalPriceQuery()
	const { mutate: buyProducts, isPending: isBuyProductsPending } =
		useBuyCartProductsMutation()

	const disabled = isPending || isStale || isBuyProductsPending || isEmpty

	const onByProducts = () => buyProducts()

	return (
		<div className={'flex flex-col items-center py-10 gap-2'}>
			<p>К оплате</p>
			<p className={'text-[#F7C04F] font-bold text-xl'}>{price}</p>
			<button
				onClick={onByProducts}
				disabled={disabled}
				className={cn(
					'bg-[#F7C04F] h-11 px-10  rounded',
					'flex justify-center items-center text-white font-bold',
					{
						'bg-gray-300': disabled
					}
				)}
			>
				Купить
			</button>
		</div>
	)
}
