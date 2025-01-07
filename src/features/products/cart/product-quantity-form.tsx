import { debounce } from 'lodash'
import { Dispatch, SetStateAction, useMemo } from 'react'

import {
	invalidateCartTotalPriceQuery,
	useIsBuyCartProductsMutating,
	useSetCartProductQuantityMutation
} from '@/entities/cart'

type Props = {
	id: string
	quantity: number
	setQuantity: Dispatch<SetStateAction<number>>
	maxQuantity: number
}

export function ProductQuantityForm({
	id,
	quantity,
	setQuantity,
	maxQuantity
}: Props) {
	const { mutate } = useSetCartProductQuantityMutation()
	const isBuyCartProductsMutating = useIsBuyCartProductsMutating() !== 0

	const debounceDelay = 500
	const debouncedMutateQuantity = useMemo(
		() =>
			debounce((quantity: number) => {
				mutate({ id, quantity })
			}, debounceDelay),
		[mutate, id]
	)

	const onDecrease = () =>
		setQuantity((quantity) => {
			invalidateCartTotalPriceQuery({ refetchType: 'none' }).then()
			const newQuantity = quantity - 1
			debouncedMutateQuantity(newQuantity)
			return newQuantity
		})

	const onIncrease = () =>
		setQuantity((quantity) => {
			invalidateCartTotalPriceQuery({ refetchType: 'none' }).then()
			const newQuantity = quantity + 1
			debouncedMutateQuantity(newQuantity)
			return newQuantity
		})

	return (
		<div className={'border border-black flex justify-between w-20 mt-3'}>
			<label
				className={'sr-only'}
				htmlFor={'product-quantity'}
			>
				product quantity
			</label>
			<button
				onClick={onDecrease}
				disabled={quantity <= 1 || isBuyCartProductsMutating}
				className={'h-6 w-6'}
			>
				-
			</button>
			<input
				value={quantity}
				className={'h-6 w-7 text-center'}
				readOnly
				id={'product-quantity'}
			/>
			<button
				onClick={onIncrease}
				disabled={quantity >= maxQuantity || isBuyCartProductsMutating}
				className={'h-6 w-6'}
			>
				+
			</button>
		</div>
	)
}
