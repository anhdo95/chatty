import { combineReducers, AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import chat, { State as ChatState } from './chat'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {
	client: unknown
	server: unknown
}

export interface RootState {
	app: State
	chat: ChatState
}

// create your reducer
const reducer = (state: State, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			// Attention! This will overwrite client state! Real apps should use proper reconciliation.
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default combineReducers<RootState>({
	app: reducer,
	chat,
})
