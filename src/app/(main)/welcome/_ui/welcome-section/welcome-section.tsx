import Image from 'next/image'
import Link from 'next/link'

import { routes } from '@/shared/config/routes'

import bunImage from './bun.png'
import cookie1Image from './cookie1.png'
import cookie2Image from './cookie2.png'
import cookie3Image from './cookie3.png'
import cookie4Image from './cookie4.png'

export function WelcomeSection() {
	return (
		<section className={'min-h-96 py-5'}>
			<Image
				src={bunImage}
				alt={'bun'}
				priority
				className={
					'w-[400px] block ml-auto float-end mb-5 md:mb-10 md:ml-10 xl:mb-0 xl:mt-0'
				}
			/>

			<h1
				className={
					'text-2xl font-montserrat text-center px-10 mt-10 clear-both md:clear-none lg:text-5xl'
				}
			>
				Добро пожаловать в <span className='font-medium'>EatWEB!</span>
			</h1>

			<p
				className={
					'text-2xl font-semibold text-center px-10 mt-1 text-[#228536]'
				}
			>
				Потребляй правильно. Экологично. Вкусно. Выгодно.
			</p>

			<Link
				href={routes.aboutUs()}
				className={
					'w-44 h-11 bg-[#cddf95] rounded-2xl mx-auto flex justify-center items-center mt-5 text-base font-semibold'
				}
			>
				Подробнее о нас
			</Link>

			<div
				className={
					'mt-14 flex justify-around gap-5 clear-both xl:clear-none xl:px-32 2xl:px-16 2xl:gap-0'
				}
			>
				<Image
					src={cookie1Image}
					alt={'cookie'}
					height={135}
					width={155}
				/>
				<Image
					src={cookie2Image}
					alt={'cookie'}
					height={135}
					width={155}
				/>
				<Image
					src={cookie3Image}
					alt={'cookie'}
					height={135}
					width={155}
				/>
				<Image
					src={cookie4Image}
					alt={'cookie'}
					height={135}
					width={155}
				/>
			</div>
		</section>
	)
}

// 115 135
