
import { Dispatch, SetStateAction } from 'react'

type Props = {
	id: string
	quantity: number
	setQuantity: Dispatch<SetStateAction<number>>
	maxQuantity: number
}

export function ProductQuantityForm({
	quantity,
	setQuantity,
	maxQuantity
}: Props) {

	const onDecrease = () =>
		setQuantity((quantity) => {
			const newQuantity = quantity - 1
			return newQuantity
		})

	const onIncrease = () =>
		setQuantity((quantity) => {
			const newQuantity = quantity + 1
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
				disabled={quantity <= 1}
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
				disabled={quantity >= maxQuantity}
				className={'h-6 w-6'}
			>
				+
			</button>
		</div>
	)
}
