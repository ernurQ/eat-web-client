import { PropsWithChildren } from 'react'

import { Navbar } from '@/app/owner/_ui/companyNavbar'

export default function MainLayout({ children }: PropsWithChildren) {
	return <>
    <Navbar />
    {children}</>
}
