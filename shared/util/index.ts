export function classes(...names: (string | { [key: string]: boolean })[]): string {
	return names
		.reduce(function accumulate(result: string[], name) {
			if (typeof name === 'boolean') return result
			if (typeof name === 'string') return result.concat(name)

			Object.keys(name).forEach(className => {
				if (name[className]) {
					result.push(className)
				}
			})

			return result
		}, [])
		.join(' ')
}
