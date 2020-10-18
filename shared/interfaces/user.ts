export interface UsersRequest {
	limit: number
	offset: number
	term: string
}

export interface Users {
	items: User[]
	totalItems: number
}

export interface User {
	id: number
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
}
