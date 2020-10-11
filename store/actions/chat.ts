import { AnyAction } from 'redux'
import { User, Message } from '@/interfaces/chat'
import { Conversations } from '@/interfaces/conversation'

export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE'
export const SET_CHAT_OWNER = 'ADD_CHAT_OWNER'
export const SET_CHAT_ROOMS = 'SET_CHAT_ROOMS'

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

export function setChatRooms(rooms: Conversations): AnyAction {
	return {
		type: SET_CHAT_ROOMS,
		payload: rooms,
	}
}
