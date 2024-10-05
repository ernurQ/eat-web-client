export function createQueryParams(params: Record<string, any>): string {
	const queryParams = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			queryParams.append(key, String(value)) // Ensure everything is a string
		}
	})

	return queryParams.toString()
}
