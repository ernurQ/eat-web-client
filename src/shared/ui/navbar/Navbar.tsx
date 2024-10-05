import Link from 'next/link'

import { routes } from '@/shared/config'

export function Navbar() {
	return (
		<nav className='p-5 flex justify-around bg-slate-300'>
			<Link href={routes.welcome()}>Eat web</Link>
			<Link href={routes.aboutUs()}>О нас</Link>
			<Link href={routes.catalog()}>Каталог</Link>
			<Link href={routes.favorites()}>Любимые</Link>
			<Link href={routes.cart()}>basket</Link>
			<Link href={routes.profileMe()}>Аккаунт</Link>
		</nav>
	)
}
