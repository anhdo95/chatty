import { AnyAction } from 'redux'
import { ADD_CHAT_MESSAGE, SET_CHAT_OWNER } from '@/store/actions/chat'
import { Message, User } from '@/interfaces/chat'

export interface State {
	messages: Message[]
	owner: User
}

const initialState: State = {
	messages: [],
	owner: null,
}

function reducer(state: State = initialState, action: AnyAction): State {
	switch (action.type) {
		case ADD_CHAT_MESSAGE:
			return { ...state, messages: [...state.messages, action.payload] }

		case SET_CHAT_OWNER:
			return { ...state, owner: action.payload }
		default:
			return state
	}
}

export default reducer
