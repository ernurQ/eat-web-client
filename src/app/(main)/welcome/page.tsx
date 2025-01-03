import { CatalogSection } from '@/app/(main)/welcome/_ui/catalog-section'
import { WelcomeSection } from '@/app/(main)/welcome/_ui/welcome-section'
import { WhyUsSection } from '@/app/(main)/welcome/_ui/why-us-section'

export default function WelcomePage() {
	return (
		<>
			<WelcomeSection />
			<CatalogSection />
			<WhyUsSection />
		</>
	)
}
