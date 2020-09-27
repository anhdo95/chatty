import { AnyAction } from 'redux'
import { User, Message } from '@/interfaces/chat'

export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE'
export const SET_CHAT_OWNER = 'ADD_CHAT_OWNER'

export function addMessage(message: Message): AnyAction {
	return {
		type: ADD_CHAT_MESSAGE,
		payload: message,
	}
}

export function setOwner(user: User): AnyAction {
	return {
		type: SET_CHAT_OWNER,
		payload: user,
	}
}
