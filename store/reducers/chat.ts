import { AnyAction } from 'redux'
import {
	SET_CHAT_MESSAGES,
	ADD_CHAT_MESSAGE,
	SET_CHAT_OWNER,
	SET_CHAT_ROOMS,
	SET_SELECTED_ROOM,
	RESET_CHAT_MESSAGES,
} from '@/store/actions/chat'
import { User } from '@/interfaces/user'
import { Messages } from '@/interfaces/message'
import { Conversations, Conversation } from '@/interfaces/conversation'

export interface State {
	rooms: Conversations
	selectedRoom: Conversation
	messages: Messages
	owner: User
}

const initialState: State = {
	rooms: {
		items: [],
		totalItems: 0,
	},
	selectedRoom: null,
	messages: {
		items: [],
		totalItems: 0,
	},
	owner: null,
}

function reducer(state: State = initialState, action: AnyAction): State {
	switch (action.type) {
		case SET_CHAT_MESSAGES:
			return { ...state, messages: action.payload }

		case RESET_CHAT_MESSAGES:
			return {
				...state,
				messages: {
					items: [],
					totalItems: 0,
				},
			}

		case ADD_CHAT_MESSAGE:
			state.messages.items.push.call(state.messages.items, action.payload)

			return {
				...state,
				messages: {
					...state.messages,
					// items: { ...state.messages.items },
				},
			}

		case SET_CHAT_OWNER:
			return { ...state, owner: action.payload }

		case SET_CHAT_ROOMS:
			return { ...state, rooms: action.payload }

		case SET_SELECTED_ROOM:
			return { ...state, selectedRoom: action.payload }

		default:
			return state
	}
}

export default reducer
