'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

import companies from './companies.json'
import { CompanyProvider } from './context/companyContext'

export default function CompanyLayout({ children }: PropsWithChildren) {
	const params = useParams()
	const pathname = usePathname()

	const { id } = params

	const [company, setCompany] = useState<Company | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!id) return
		setLoading(true)

		const companyFound = companies.find((c: Company) => c.id == id) ?? null
		setCompany(companyFound)
		setLoading(false)
	}, [id])

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p>Loading company...</p>
			</div>
		)
	}

	if (!company) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p>Company not found.</p>
			</div>
		)
	}

	const activeTab = (() => {
		if (pathname?.endsWith('/products')) return 'products'
		if (pathname?.endsWith('/reviews')) return 'reviews'
		return 'about'
	})()

	return (
		<div className='max-w-5xl mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold text-center mb-6'>{company.name}</h1>

			{/* Tabs */}
			<div className='flex justify-center space-x-4 mb-8'>
				<Link
					href={`/company/${id}/products`}
					className={`px-4 py-2 rounded-md border ${
						activeTab === 'products'
							? 'bg-yellow-500 text-white'
							: 'bg-white text-gray-700 hover:bg-gray-100'
					}`}
				>
					Товары
				</Link>
				<Link
					href={`/company/${id}`}
					className={`px-4 py-2 rounded-md border ${
						activeTab === 'about'
							? 'bg-yellow-500 text-white'
							: 'bg-white text-gray-700 hover:bg-gray-100'
					}`}
				>
					О заведении
				</Link>
				<Link
					href={`/company/${id}/reviews`}
					className={`px-4 py-2 rounded-md border ${
						activeTab === 'reviews'
							? 'bg-yellow-500 text-white'
							: 'bg-white text-gray-700 hover:bg-gray-100'
					}`}
				>
					Отзывы
				</Link>
			</div>
			<CompanyProvider company={company}>{children}</CompanyProvider>
		</div>
	)
}
