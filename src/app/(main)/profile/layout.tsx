import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { routes } from '@/shared/config'

export default function ProfileLayout({ children }: PropsWithChildren) {
	return (
		<>
			<section>
				<div className={'bg-amber-200 flex justify-around p-7'}>
					<div>user profile image</div>
					<div>user name surname</div>
				</div>

				<div className={'200 flex justify-around p-2'}>
					<Link href={routes.profilePurchasedProducts()}>Мои заказы</Link>
					<Link href={routes.profileMe()}>Мой аккаунт</Link>
					<Link href={routes.profileNewPaymentMethod()}>Оплата</Link>
				</div>
			</section>

			{children}
		</>
	)
}
