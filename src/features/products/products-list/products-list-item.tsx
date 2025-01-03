import Image from 'next/image'
import Link from 'next/link'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'

import { Product } from '@/entities/products'

type Props = {
	product: Product
}

export function ProductsListItem({ product }: Props) {
	return (
		<li
			className={cn('w-48 mx-auto bg-white', 'flex flex-col justify-between')}
		>
			<div>
				<Link
					href={routes.product(product.id)}
					className={'relative h-48 w-48 block flex-shrink mx-auto'}
				>
					<Image
						src={product.thumbnail}
						alt={product.name}
						fill
						sizes={
							'(max-width: 640px) 100vw, ' +
							'(max-width: 768px) 50vw, ' +
							'(max-width: 1024px) 33vw, ' +
							'25vw'
						}
						className={'rounded'}
					/>
				</Link>

				<div className={'flex mt-2 justify-between text-base'}>
					<div className={'flex flex-wrap items-center gap-x-2'}>
						<Link
							href={routes.product(product.id)}
							className={'font-medium'}
						>
							{product.name}
						</Link>
						<div className={'h-1 w-1 rounded-full bg-[#228536]'} />
						<Link
							href={routes.department(product.department.id)}
							className={'text-[#228536]'}
						>
							{product.department.name}
						</Link>
					</div>
					{product.isFavorite ? (
						<AiFillHeart className={'text-xl text-red-600 flex-shrink-0'} />
					) : (
						<AiOutlineHeart className={'text-xl flex-shrink-0'} />
					)}
				</div>
			</div>

			<div className={'flex flex-wrap justify-between mt-2'}>
				<Link
					href={routes.product(product.id)}
					className={
						'bg-[#F7C04F] h-11 w-20 flex justify-center items-center rounded text-white'
					}
				>
					Купить
				</Link>
				<Price
					price={product.price}
					discount={product.discount}
				/>
			</div>
		</li>
	)
}

type PriceProps = {
	price: number
	discount: number
}

function Price({ price, discount }: PriceProps) {
	if (discount === 0)
		return (
			<div
				className={cn(
					'h-11 w-20 border-[#F7C04F] border-2 rounded ',
					'flex justify-center items-center font-bold'
				)}
			>
				{price} тг
			</div>
		)

	return (
		<div
			className={cn(
				'h-11 w-20 border-[#F7C04F] border-2 rounded',
				'text-center flex flex-col justify-center'
			)}
		>
			<div className={'font-bold'}>
				{((price * discount) / 100).toFixed(2)} тг
			</div>
			<div className={'text-sm flex justify-center items-center gap-1'}>
				<span className={'line-through decoration-[#228536]'}>{price}</span>
				<div className={'h-1 w-1 rounded-full bg-[#228536]'} />
				<div className={'text-[#228536]'}>-{100 - discount}%</div>
			</div>
		</div>
	)
}
