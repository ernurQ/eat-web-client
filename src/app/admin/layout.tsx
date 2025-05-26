'use client'

import { PropsWithChildren } from 'react'

import { AdminSider } from '@/app/admin/_ui/admin-sider'

export default function AdminPagesLayout({ children }: PropsWithChildren) {
	return <AdminSider>{children}</AdminSider>
}
