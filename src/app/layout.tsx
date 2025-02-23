import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import { PropsWithChildren } from 'react'

import './globals.css'
import { Providers } from '@/app/_providers/providers'

const font = Open_Sans({
	subsets: ['cyrillic'],
	weight: ['400', '700']
})

const montserrat = Montserrat({
	subsets: ['cyrillic'],
})

export const metadata: Metadata = {
	title: 'Eat web',
	description: 'Connecting Sellers and Buyers to Prevent Food Waste'
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang='ru'>
			<body className={montserrat.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
