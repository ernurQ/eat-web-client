import { Header } from '@/shared/ui'

export default function WelcomePage() {
	return (
		<>
			<>
				<section>
					<h1>Добро пожаловать в EatWEB!</h1>
				</section>

				<section>
					<Header level={2}>Почему именно мы?</Header>
				</section>

				<section>
					<Header level={2}>Контакты</Header>
				</section>
			</>
		</>
	)
}

/* TODO: about-us page catalog section
 * use next js intercepting routes to show catalog page in catalog section
 * https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
 * */
