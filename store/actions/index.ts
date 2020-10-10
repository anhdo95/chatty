import { AnyAction } from 'redux'
import { ResponseError } from '@/interfaces/error'

export const SET_ERROR = 'SET_ERROR'

export function setError(error: ResponseError): AnyAction {
	return {
		type: SET_ERROR,
		payload: error,
	}
}
