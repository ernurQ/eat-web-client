'use client'

import { useGetCompanyInfoQuery } from '@/entities/company'

interface Props {
	params: { id: string }
}

export default function CompanyAboutUsPage({ params: { id } }: Props) {
	const { data: company } = useGetCompanyInfoQuery({ id })

	if (!company) return null

	return (
		<section>
			<div>company profile image</div>
			<h2>{company.description}</h2>
			<h3>Связаться с нами</h3>
		</section>
	)
}
