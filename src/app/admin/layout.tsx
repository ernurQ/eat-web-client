'use client'

import { PropsWithChildren, Suspense } from 'react'

import { AdminSider } from '@/app/admin/_ui/admin-sider'

export default function AdminPagesLayout({ children }: PropsWithChildren) {
	return (
		<AdminSider>
			<Suspense>{children}</Suspense>
		</AdminSider>
	)
}
