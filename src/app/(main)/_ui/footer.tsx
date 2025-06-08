import Link from 'next/link'
import { AiFillInstagram, AiFillTikTok } from 'react-icons/ai'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'
import { EatWebLogo } from '@/shared/ui/eat-web-logo'

import { SubscribeNewsForm } from '@/features/users/subscribe-news-form'

export function Footer() {
	return (
		<footer
		id='footer'
			className={cn(
				'flex flex-wrap justify-around bg-[#fce1ab] py-10 gap-5',
				'text-xs px-2 md:flex-row-reverse'
			)}
		>
			<div className={cn('flex justify-between', 'gap-4')}>
				<section className={'flex flex-col gap-y-3'}>
					<header className={'font-bold'}>Контакты</header>
					<Link href={'tel:+77087275555'}>+77087275555</Link>
					<Link href={'mailto:eatweb.with.us@gmail.com'}>
						eatweb.with.us@gmail.com
					</Link>
					<div className={'flex text-3xl text-[#228536]'}>
						<AiFillInstagram />
						<AiFillTikTok />
					</div>
				</section>

				<section className={'flex flex-col gap-y-3'}>
					<header className={'font-bold'}>About</header>
					<Link href={routes.aboutUs()}>О нас</Link>
					<Link href={routes.catalog()}>Каталог</Link>
				</section>

				<section className={'flex flex-col gap-y-3'}>
					<header className={'font-bold'}>Поддержка</header>
					<Link href={'/'}>Политика приватности</Link>
					<Link href={'/'}>Отзывы</Link>
				</section>
			</div>

			<div className={''}>
				<p className={'text-center max-w-96'}>
					Оставьте свою почту, чтобы не пропустить последние новостит и
					интересные скидки, а также промокоды
				</p>
				<SubscribeNewsForm className={'max-w-60 mx-auto mt-5'} />
				<EatWebLogo className={'mx-auto mt-5'} />
			</div>
		</footer>
	)
}

// TODO: fix links
