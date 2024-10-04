import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

import './globals.css'

const font = Inter({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
	title: 'eat web app',
	description:
		'A platform to share surplus food and help reduce waste in your community.'
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang='en'>
			<body className={font.className}>{children}</body>
		</html>
	)
}
