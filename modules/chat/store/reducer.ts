import { AnyAction } from 'redux'
import {
	SET_ACTIVE_TAB,
	SET_CHAT_MESSAGES,
	ADD_CHAT_MESSAGE,
	SET_CHAT_ROOMS,
	SET_SELECTED_ROOM,
	RESET_CHAT_MESSAGES,
	SET_FRIENDS,
} from './actions'
import { Messages } from '@/modules/chat/interfaces/message'
import { Friends } from '@/modules/chat/interfaces/friend'
import { Conversations, Conversation } from '@/modules/chat/interfaces/conversation'
import { Tab } from '@/modules/chat/enums/tab'

export interface ChatState {
	activeTab: Tab
	rooms: Conversations
	selectedRoom: Conversation
	messages: Messages
	friends: Friends
}

const initialState: ChatState = {
	activeTab: Tab.Messages,
	rooms: {
		items: [],
		totalItems: 0,
	},
	selectedRoom: null,
	messages: {
		items: [],
		totalItems: 0,
	},
	friends: {
		items: [],
		totalItems: 0,
	},
}

function reducer(state: ChatState = initialState, action: AnyAction): ChatState {
	switch (action.type) {
		case SET_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.payload,
			}

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
			state.rooms.items = state.rooms.items.map(room => {
				if (room.id === action.payload.conversationId) {
					room.lastMessage = action.payload
				}
				return room
			})

			if (state.selectedRoom?.id === action.payload.conversationId) {
				state.messages.items.push.call(state.messages.items, action.payload)
			}

			return {
				...state,
				messages: {
					...state.messages,
				},
				rooms: {
					...state.rooms,
				},
			}

		case SET_CHAT_ROOMS:
			return { ...state, rooms: action.payload }

		case SET_SELECTED_ROOM:
			return { ...state, selectedRoom: action.payload }

		case SET_FRIENDS:
			return { ...state, friends: action.payload }

		default:
			return state
	}
}

export default reducer
