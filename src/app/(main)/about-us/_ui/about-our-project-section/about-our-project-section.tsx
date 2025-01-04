import Image from 'next/image'

import { cn } from '@/shared/lib/classnames'
import { Header } from '@/shared/ui/header'

import ecoPackImage from './eco-pack.webp'

export function AboutOurProjectSection() {
	return (
		<section className={'flex flex-col py-10  px-5'}>
			<Header className={'mx-auto'}>О нашем проекте</Header>
			<p className={'text-center mt-5'}>
				EatWEB - Eat with ecological benefits
			</p>

			<div
				className={cn(
					'flex flex-col justify-center items-center gap-5 mt-5',
					'sm:flex-row-reverse sm:items-start'
				)}
			>
				<Image
					src={ecoPackImage}
					alt={'eco pack'}
					className={'w-[240px] md:w-[265px] lg:w-[290px] xl:w-[320px]'}
				/>

				<p className={'max-w-[600px] text-base lg:text-lg'}>
					<span className={'font-bold'}>Основная идея платформы</span> — помочь
					предприятиям общественного питания продавать со скидкой продукты
					питания, срок годности которых приближается к концу, а не выбрасывать
					их. Это позволяет предприятиям сокращать отходы, потребители имеют
					доступ к качественной ресторанной еде по конкурентоспособным ценам и в
					целом помогает сократить пищевые отходы, что является положительным
					экологическим шагом. Этот сайт решает проблемы как заведения общепита,
					так и вас, потребителя, создавая выгодную среду для обеих сторон.
				</p>
			</div>
		</section>
	)
}

// w   h
// 16  15
// 320 300
// 240 223
