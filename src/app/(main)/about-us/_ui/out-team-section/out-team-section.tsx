import Image, { StaticImageData } from 'next/image'

import { Header } from '@/shared/ui/header'

import { teamMembers } from '@/app/(main)/about-us/_ui/out-team-section/constants'

export function OutTeamSection() {
	return (
		<section className={'flex flex-col items-center py-10 px-5 gap-10'}>
			<Header className={'mx-auto'}>Наша команда</Header>

			{teamMembers.map((teamMemberData) => (
				<TeamMemberCard
					key={teamMemberData.name}
					{...teamMemberData}
				/>
			))}
		</section>
	)
}

function TeamMemberCard({
	avatar,
	name,
	text
}: {
	avatar: StaticImageData
	name: string
	text: string
}) {
	return (
		<div className={'flex flex-col sm:flex-row gap-10 items-center'}>
			<Image
				src={avatar}
				alt={name}
				className={'mx-auto w-[240px] flex-shrink-0'}
			/>
			<article className={'max-w-[700px] text-center sm:text-left'}>
				<header className={'font-bold sm:text-lg md:text-xl'}>{name}</header>
				<p className={'bg-[#cddf95] p-2 mt-5'}>{text}</p>
			</article>
		</div>
	)
}
