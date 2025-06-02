'use client'

import Image from 'next/image'

import { useCompany } from '../context/companyContext'
import { InstagramOutlined, PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons'

export default function CompanyProfilePage() {
	const company = useCompany()

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Left column: logo */}
				<div className='flex justify-center md:justify-start'>
					<div className='w-40 h-40 md:w-48 md:h-48 relative'>
						<Image
							src={company.logo}
							alt={`${company.name} logo`}
							fill
							className='object-contain rounded-full border shadow-sm'
						/>
					</div>
				</div>

				{/* Right column: description + address + contacts */}
				<div className='space-y-4'>
					<h2 className='text-2xl font-semibold'>Описание</h2>
					<p className='text-gray-700 leading-relaxed'>{company.description}</p>
					<p className='font-medium'>
						Адрес: <span className='text-gray-600'>{company.address}</span>
					</p>
				</div>
			</div>
			<h2 className='text-2xl font-semibold mt-6'>Связаться с нами</h2>
			<div className='space-y-2'>
				<p className='flex gap-3 items-center text-green-700'>
					<PhoneOutlined />
					{company.phone}
				</p>
				<p className='flex gap-3 items-center text-green-700'>
					<WhatsAppOutlined />
					{company.whatsapp}
				</p>
				{company.instagram && (
					<p className='flex gap-3 items-center text-green-700'>
						<InstagramOutlined />
						@{company.instagram}
					</p>
				)}
			</div>
		</>
	)
}
