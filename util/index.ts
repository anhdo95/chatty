export function joinClass(...classes: string[]): string {
	return classes.filter(Boolean).join(' ')
}
