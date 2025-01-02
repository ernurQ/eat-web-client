'use client'

import { PropsWithChildren } from 'react'

import { ReactHotToastProvider } from '@/app/_providers/react-hot-toast'
import { TanstackQueryProvider } from '@/app/_providers/tanstack-query'

export function Providers({ children }: PropsWithChildren) {
	return (
		<TanstackQueryProvider>
			<ReactHotToastProvider>{children}</ReactHotToastProvider>
		</TanstackQueryProvider>
	)
}
