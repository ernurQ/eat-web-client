'use client'

import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { routes } from '@/shared/config'
import { Header } from '@/shared/ui'

import { useGetCompanyInfoQuery } from '@/entities/company'

interface Props extends PropsWithChildren {
	params: { id: string }
}

export default function CompanyLayout({ children, params: { id } }: Props) {
	const { data: company } = useGetCompanyInfoQuery({ id })

	if (!company) return null

	return (
		<>
			<Header level={1}>{company.name}</Header>
			<div className='flex justify-around'>
				<Link href={routes.companyProducts(id)}>Товары</Link>
				<Link href={routes.company(id)}>О заведении</Link>
				<Link href={routes.companyReviews(id)}>Отзывы</Link>
			</div>
			{children}
		</>
	)
}
