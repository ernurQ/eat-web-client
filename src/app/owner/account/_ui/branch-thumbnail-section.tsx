'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ChangeEvent } from 'react'

import {
	invalidateSellerBranchInfoQuery,
	sellerBranchInfoOptions,
	uploadBranchThumbnail
} from '@/entities/branch'

export function BranchThumbnailSection() {
	const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.item(0)
		if (file) {
			await uploadBranchThumbnail({ file })
			await invalidateSellerBranchInfoQuery()
		}
	}

	const { data } = useQuery(sellerBranchInfoOptions())

	return (
		<section>
			<label className='block text-sm font-medium text-gray-700 mb-2'>
				Логотип компании
			</label>
			<div className='flex items-center space-x-6'>
				<div className='w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed border-green-300 relative'>
					<Image
						src={data?.thumbnail || '/images/placeholder/branch-thumbnail.png'}
						alt={`Логотип`}
						fill
						sizes={'300px'}
						priority={true}
						className='object-contain rounded-full border shadow-sm'
					/>
				</div>

				<div>
					<label
						htmlFor='logo'
						className='inline-block px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-lg cursor-pointer transition'
					>
						Загрузить новый
					</label>
					<input
						id='logo'
						type='file'
						accept='image/*'
						onChange={handleLogoChange}
						className='hidden'
					/>
				</div>
			</div>
		</section>
	)
}
