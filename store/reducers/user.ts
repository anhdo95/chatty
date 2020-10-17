import { AnyAction } from 'redux'
import { SET_LOGGED_IN_USER } from '@/store/actions/user'
import { User } from '@/shared/interfaces/user'

export interface State {
	loggedInUser: User
}

const initialState: State = {
	loggedInUser: null,
}

function reducer(state: State = initialState, action: AnyAction): State {
	switch (action.type) {
		case SET_LOGGED_IN_USER:
			return { ...state, loggedInUser: action.payload }

		default:
			return state
	}
}

export default reducer
