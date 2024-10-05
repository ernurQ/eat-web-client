import { Header } from '@/shared/ui'

export default function AboutUsPage() {
	return (
		<>
			<section>
				<Header level={1}>О нашем проекте</Header>
				<p>description text</p>
			</section>
			<section>
				<Header level={2}>Наша команда</Header>
				<div>team members list</div>
			</section>
		</>
	)
}
