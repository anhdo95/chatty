export interface RegisterRequest {
	name: string
	email: string
	password: string
}

export interface RegisterResponse {
	id: number
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
}
