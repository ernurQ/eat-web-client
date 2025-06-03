'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'

import { branchInfoQueryOptions } from '@/entities/branch'

export default function CompanyLayout({ children }: PropsWithChildren) {
	const { id } = useParams<{ id: string }>()
	const pathname = usePathname()

	const {
		data: branch,
		isPending,
		isError
	} = useQuery(branchInfoQueryOptions({ id }))

	if (isPending) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<p>Loading company...</p>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='flex flex-col justify-center items-center h-screen'>
				<p>Company not found.</p>
			</div>
		)
	}

	return (
		<div className='max-w-5xl mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold text-center mb-6'>{branch.name}</h1>

			{/* Tabs */}
			<div className='flex justify-center space-x-4 mb-8'>
				<Link
					href={routes.branch.products(id)}
					className={cn(
						`px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-100`,
						{
							'bg-yellow-500 text-white':
								pathname === routes.branch.products(id)
						}
					)}
				>
					Товары
				</Link>
				<Link
					href={routes.branch.profile(id)}
					className={cn(
						`px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-100`,
						{
							'bg-yellow-500 text-white': pathname === routes.branch.profile(id)
						}
					)}
				>
					О заведении
				</Link>
				<Link
					href={routes.branch.reviews(id)}
					className={cn(
						`px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-100`,
						{
							'bg-yellow-500 text-white': pathname === routes.branch.reviews(id)
						}
					)}
				>
					Отзывы
				</Link>
			</div>
			{children}
		</div>
	)
}
