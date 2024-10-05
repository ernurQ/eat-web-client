import Image from 'next/image'
import Link from 'next/link'

import { routes } from '@/shared/config'

import { IProduct } from '../model/product.model'

interface Props {
	product: IProduct
}

export function ProductsListItem({ product }: Props) {
	return (
		<li className='w-[282px] border rounded-lg p-4 mx-auto'>
			<div className='relative'>
				<Image
					src={product.thumbnail}
					alt={product.name}
					className='w-full h-[200px] object-cover rounded-lg'
					width={500}
					height={500}
					unoptimized
				/>
				{/* <FaHeart className='absolute top-2 right-2 text-red-500' /> */}
			</div>

			<div className='mt-4 text-center'>
				<h3 className='text-xl font-medium'>{product.name}</h3>
				<Link
					href={routes.company(product.company.id)}
					className='text-sm text-gray-500'
				>
					<span className='text-green-500'>•</span> {product.company.name}
				</Link>
			</div>

			<div className='flex justify-center mt-4'>
				<button className='bg-yellow-400 text-white font-medium py-2 px-6 rounded-lg'>
					Купить
				</button>
			</div>

			<div className='flex justify-between items-center mt-4 text-center'>
				<div className='text-lg font-bold'>{product.price}</div>
				<div>
					<span className='line-through text-gray-400 text-sm'>1000 тг</span>{' '}
					<span className='text-red-500 text-sm'>-{product.discount}%</span>
				</div>
			</div>

			{/* <FaHeart className='mt-4 text-red-500 mx-auto' /> */}
		</li>
	)
}

// TODO: ui like button with heart icon
