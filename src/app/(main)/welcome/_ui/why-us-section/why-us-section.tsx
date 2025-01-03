import Image from 'next/image'
import Link from 'next/link'

import { routes } from '@/shared/config/routes'
import { cn } from '@/shared/lib/classnames'
import { Header } from '@/shared/ui/header'

import saladImage from './salad.webp'

export function WhyUsSection() {
	return (
		<section
			className={cn(
				'flex items-center p-10 gap-5',
				'flex-col sm:flex-row-reverse sm:items-stretch sm:justify-around lg:px-11 xl:px-16'
			)}
		>
			<Header className={'text-[1.20rem] sm:hidden'}>Почему именно мы?</Header>

			<div>
				<div
					className={cn(
						'relative',
						'h-80 w-60 md:h-[440px] md:w-[330px] xl:h-[550px] xl:w-[405px]'
					)}
				>
					<Image
						src={saladImage}
						alt={'salad'}
						fill
						sizes={
							'(max-width: 640px) 100vw, ' +
							'(max-width: 1024px) 50vw, ' +
							'30vw'
						}
					/>
				</div>
			</div>

			<div className={'flex flex-col items-center sm:pt-12'}>
				<Header className={'hidden sm:flex'}>Почему именно мы?</Header>
				<p
					className={cn(
						'text-center sm:mt-5 max-w-[700px]',
						'text-base md:text-lg lg:text-xl'
					)}
				>
					Выбирая нас, вы экономите на качественной ресторанной еде и активно
					участвуете в снижении продовольственных отходов. Наш стартап — ваш шаг
					к выгодным покупкам и заботе о окружающей среде.
				</p>

				<Link
					href={routes.aboutUs()}
					className={cn(
						'w-44 h-11 bg-[#cddf95] rounded mx-auto mt-5 lg:mt-20',
						'flex justify-center items-center text-base font-semibold'
					)}
				>
					Подробнее о нас
				</Link>
			</div>
		</section>
	)
}
