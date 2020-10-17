import { AnyAction } from 'redux'
import { User } from '@/shared/interfaces/user'

export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'

export function setLoggedInUser(user: User): AnyAction {
	return {
		type: SET_LOGGED_IN_USER,
		payload: user,
	}
}
