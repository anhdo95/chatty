import { AnyAction } from 'redux'
import { SET_LOGGED_IN_USER } from './actions'
import { User } from '@/shared/interfaces/user'

export interface AuthState {
	loggedInUser: User
}

const initialState: AuthState = {
	loggedInUser: null,
}

function reducer(state: AuthState = initialState, action: AnyAction): AuthState {
	switch (action.type) {
		case SET_LOGGED_IN_USER:
			return { ...state, loggedInUser: action.payload }

		default:
			return state
	}
}

export default reducer
