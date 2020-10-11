import { combineReducers, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import chat, { State as ChatState } from './chat'
import user, { State as UserState } from './user'
import { ResponseError } from '@/interfaces/error'
import { SET_ERROR } from '../actions'

export interface State {
	client?: null
	server?: null
	error?: ResponseError
}

export interface RootState {
	app: State
	chat: ChatState
	user: UserState
}

// create your reducer
const reducer = (state: State = {}, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			// Attention! This will overwrite client state! Real apps should use proper reconciliation.
			return { ...state, ...action.payload }

		case SET_ERROR:
			return { ...state, error: action.payload }

		default:
			return state
	}
}

export default combineReducers<RootState>({
	app: reducer,
	chat,
	user,
})
