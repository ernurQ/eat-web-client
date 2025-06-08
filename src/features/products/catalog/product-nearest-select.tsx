import { cn } from '@/shared/lib/classnames'

type Props = {
	selectedRange: string
	onSelectRange: (value: string) => void
}

export function SelectNearestProducts({ selectedRange, onSelectRange }: Props) {
	return (
		<div className='flex items-center gap-5'>
		<div className='text-center text-xs'>Сортировать продуктов <br /> по расстоянию</div>
		<select
			onChange={(e) => onSelectRange(e.target.value)}
			value={selectedRange}
			className={cn(
				'w-full sm:w-[180px] border pl-4 pr-4 py-2 rounded-full',
				'text-sm text-gray-800 bg-white',
				'focus:ring-2 focus:ring-[#cddf95]',
				'outline-none transition-all duration-300'
			)}
		>
			<option value="all">Все</option>
			<option value="<1">Менее 1 км</option>
			<option value="<3">Менее 3 км</option>
			<option value=">3">Более 3 км</option>
		</select>
		</div>
	)
}
