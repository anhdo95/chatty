import { AnyAction } from 'redux'
import { Conversations, Conversation } from '@/modules/chat/interfaces/conversation'
import { Messages, Message } from '@/modules/chat/interfaces/message'
import { Tab } from '@/modules/chat/enums/tab'

export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB'

export const SET_CHAT_MESSAGES = 'SET_CHAT_MESSAGES'
export const RESET_CHAT_MESSAGES = 'RESET_CHAT_MESSAGES'
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE'

export const SET_CHAT_ROOMS = 'SET_CHAT_ROOMS'
export const SET_SELECTED_ROOM = 'SET_SELECTED_ROOM'

export function setActiveTab(tab: Tab): AnyAction {
	return {
		type: SET_ACTIVE_TAB,
		payload: tab,
	}
}

export function setMessages(messages: Messages): AnyAction {
	return {
		type: SET_CHAT_MESSAGES,
		payload: messages,
	}
}

export function resetMessages(): AnyAction {
	return {
		type: RESET_CHAT_MESSAGES,
	}
}

export function addMessage(message: Message): AnyAction {
	return {
		type: ADD_CHAT_MESSAGE,
		payload: message,
	}
}

export function setChatRooms(rooms: Conversations): AnyAction {
	return {
		type: SET_CHAT_ROOMS,
		payload: rooms,
	}
}

export function setSelectedRoom(room: Conversation): AnyAction {
	return {
		type: SET_SELECTED_ROOM,
		payload: room,
	}
}
