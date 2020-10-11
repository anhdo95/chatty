import { AnyAction } from 'redux'
import { ADD_CHAT_MESSAGE, SET_CHAT_OWNER, SET_CHAT_ROOMS } from '@/store/actions/chat'
import { Message, User } from '@/interfaces/chat'
import { Conversations } from '@/interfaces/conversation'

export interface State {
	rooms: Conversations
	messages: Message[]
	owner: User
}

const initialState: State = {
	rooms: {
		items: [],
		totalItems: 0,
	},
	messages: [],
	owner: null,
}

function reducer(state: State = initialState, action: AnyAction): State {
	switch (action.type) {
		case ADD_CHAT_MESSAGE:
			return { ...state, messages: [...state.messages, action.payload] }

		case SET_CHAT_OWNER:
			return { ...state, owner: action.payload }

		case SET_CHAT_ROOMS:
			return { ...state, rooms: action.payload }

		default:
			return state
	}
}

export default reducer
