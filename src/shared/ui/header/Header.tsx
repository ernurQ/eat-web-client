import { clsx } from 'clsx'
import { ComponentPropsWithoutRef, createElement } from 'react'

interface Props extends ComponentPropsWithoutRef<'h1'> {
	level: number
}

export function Header({ level, children, className, ...props }: Props) {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements
	return createElement(
		Tag,
		{
			className: clsx(
				'text-xl bg-amber-500 rounded-2xl text-center m-3 p-3',
				className
			),
			...props
		},
		children
	)
}
