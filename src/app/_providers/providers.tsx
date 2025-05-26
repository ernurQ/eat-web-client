import { PropsWithChildren } from 'react'

import { AntDesignProvider } from '@/app/_providers/ant-design'
import { ReactHotToastProvider } from '@/app/_providers/react-hot-toast'
import { TanstackQueryProvider } from '@/app/_providers/tanstack-query'

export function Providers({ children }: PropsWithChildren) {
	return (
		<AntDesignProvider>
			<TanstackQueryProvider>
				<ReactHotToastProvider>{children}</ReactHotToastProvider>
			</TanstackQueryProvider>
		</AntDesignProvider>
	)
}
