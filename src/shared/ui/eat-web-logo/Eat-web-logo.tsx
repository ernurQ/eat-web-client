import Image from 'next/image'

import { cn } from '@/shared/lib/classnames'

import logo from './eat-web-logo.webp'

export function EatWebLogo({ className }: { className?: string }) {
	return (
		<Image
			src={logo}
			alt={'eat web logo'}
			height={35}
			width={120}
			className={cn('h-auto w-auto', className)}
		/>
	)
}
