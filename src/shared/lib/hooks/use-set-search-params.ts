import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useSetSearchParam() {
	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const pathName = usePathname()

	return useCallback(
		(query: Record<string, string | undefined>) => {
			const params = new URLSearchParams(searchParams)
			Object.keys(query).forEach((key) => {
				const value = query[key]
				if (value) {
					params.set(key, value)
				} else {
					params.delete(key)
				}
			})

			replace(`${pathName}?${params.toString()}`, { scroll: false })
		},
		[replace, searchParams, pathName]
	)
}
