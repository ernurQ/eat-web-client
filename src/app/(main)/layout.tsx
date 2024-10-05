import { PropsWithChildren } from 'react'

import { Footer, Navbar } from '@/shared/ui'

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	)
}
