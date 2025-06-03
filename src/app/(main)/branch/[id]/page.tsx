'use client'

import {
	InstagramOutlined,
	PhoneOutlined,
	WhatsAppOutlined
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import { branchInfoQueryOptions } from '@/entities/branch/branch-info'

export default function CompanyProfilePage() {
	const {
		data: branch,
		isPending,
		isError
	} = useQuery(branchInfoQueryOptions({ id: '683d58b675b43bf1d00abc9c' }))

	if (isPending) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p>Loading company...</p>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p>Company not found.</p>
			</div>
		)
	}

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Left column: logo */}
				<div className='flex justify-center md:justify-start'>
					<div className='w-40 h-40 md:w-48 md:h-48 relative'>
						<Image
							src={
								branch.thumbnail || '/images/placeholder/branch-thumbnail.png'
							}
							alt={`${branch.name} logo`}
							fill
							sizes={'300px'}
							priority={true}
							className='object-contain rounded-full border shadow-sm'
						/>
					</div>
				</div>

				{/* Right column: description + address + contacts */}
				<div className='space-y-4'>
					<h2 className='text-2xl font-semibold'>Описание</h2>
					<p className='text-gray-700 leading-relaxed'>{branch.description}</p>
					<p className='font-medium'>
						Адрес: <span className='text-gray-600'>{branch.location}</span>
					</p>
				</div>
			</div>
			<h2 className='text-2xl font-semibold mt-6'>Связаться с нами</h2>
			<div className='space-y-2'>
				<p className='flex gap-3 items-center text-green-700'>
					<PhoneOutlined />
					{'77777777777'}
				</p>
				<p className='flex gap-3 items-center text-green-700'>
					<WhatsAppOutlined />
					{'77778883399'}
				</p>
				<p className='flex gap-3 items-center text-green-700'>
					<InstagramOutlined />@{'instagram'}
				</p>
			</div>
		</>
	)
}
