import { HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/classnames'

type Props = HTMLAttributes<HTMLDivElement>

export function Header({ className, ...props }: Props) {
	return (
		<header
			className={cn(
				'bg-[#cddf95] rounded-tl-3xl rounded-br-3xl px-6',
				'flex justify-center items-end font-medium text-3xl text-center',
				'relative h-5 pb-1',
				className
			)}
			{...props}
		/>
	)
}
