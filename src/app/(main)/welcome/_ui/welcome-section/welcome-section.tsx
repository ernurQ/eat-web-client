import Image from 'next/image'
import Link from 'next/link'

import { routes } from '@/shared/config/routes'

import bunImage from './bun.webp'
import cookie1Image from './cookie1.webp'
import cookie2Image from './cookie2.webp'
import cookie3Image from './cookie3.webp'

export function WelcomeSection() {
	return (
		<section className={'min-h-96 py-5'}>
			<Image
				src={bunImage}
				alt={'bun'}
				priority
				className={
					'block ml-auto float-end mb-5 md:mb-10 md:ml-10 xl:mb-0 xl:mt-5'
				}
			/>

			<h1
				className={
					'text-2xl font-semibold text-center px-10 mt-10 clear-both md:clear-none lg:text-3xl'
				}
			>
				Добро пожаловать в EatWEB!
			</h1>

			<p
				className={
					'text-sm font-semibold text-center px-10 mt-1 text-[#228536]'
				}
			>
				Потребляй правильно. Экологично. Вкусно. Выгодно.
			</p>

			<Link
				href={routes.aboutUs()}
				className={
					'w-44 h-11 bg-[#cddf95] rounded mx-auto flex justify-center items-center mt-5 text-base font-semibold'
				}
			>
				Подробнее о нас
			</Link>

			<div
				className={
					'mt-5 flex justify-around gap-5 clear-both xl:clear-none xl:px-32 2xl:px-56'
				}
			>
				<Image
					src={cookie1Image}
					alt={'cookie'}
					height={135}
					width={115}
				/>
				<Image
					src={cookie2Image}
					alt={'cookie'}
					height={135}
					width={115}
				/>
				<Image
					src={cookie3Image}
					alt={'cookie'}
					height={135}
					width={115}
				/>
			</div>
		</section>
	)
}

// 115 135
