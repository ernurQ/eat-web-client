'use client'

import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

export function ReactHotToastProvider({ children }: PropsWithChildren) {
	return (
		<>
			{children}
			<Toaster />
		</>
	)
}
