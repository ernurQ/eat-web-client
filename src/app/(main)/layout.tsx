import { PropsWithChildren } from 'react'

import { Footer } from '@/app/(main)/_ui/footer'
import { Navbar } from '@/app/(main)/_ui/navbar'

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}
