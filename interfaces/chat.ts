export interface Message {
	id: string
	user: string
	text: string
}

export interface User {
	id?: string
	name: string
	room: string
}
