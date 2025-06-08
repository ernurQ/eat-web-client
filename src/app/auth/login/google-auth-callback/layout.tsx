import { PropsWithChildren, Suspense } from 'react'

export default function LayoutPage({ children }: PropsWithChildren) {
	return <Suspense>{children}</Suspense>
}
