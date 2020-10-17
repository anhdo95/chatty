export function classes(...names: (string | { [key: string]: boolean })[]): string {
	return names
		.reduce((result: string[], name) => {
			if (typeof name === 'boolean') return result
			if (typeof name === 'string') return result.concat(name)

			const [className] = Object.keys(name)
			const [condition] = Object.values(name)
			if (condition) {
				return result.concat(className)
			}

			return result
		}, [])
		.join(' ')
}
