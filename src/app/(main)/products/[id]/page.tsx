import Link from 'next/link'

import { routes } from '@/shared/config'

export default function ProductPage() {
	return (
		<section>
			<h1>product name</h1>
			<Link href={routes.company('1')}>product company name</Link>
			<p>product description</p>
			...
		</section>
	)
}
