import React from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

import { RootState } from '@/store/reducers'
import { setError } from '@/store/actions'
import { setLoggedInUser } from '@/store/actions/user'
import apiService from '@/services/api.service'

import { ResponseError } from '@/interfaces/error'
import { User } from '@/interfaces/user'

import styles from './style.module.scss'

const notifyError = (error: ResponseError) => {
	NotificationManager.error(error.message, 'Opps!', 5000)
}

function Layout(props: React.Props<unknown>): JSX.Element {
	const error = useSelector<RootState, ResponseError>(state => state.app.error)
	const loggedInUser = useSelector<RootState, User>(state => state.user.loggedInUser)
	const dispatch = useDispatch()

	if (error) {
		notifyError(error)
		dispatch(setError(null))
	}

	if (!loggedInUser && Cookies.get('token')) {
		apiService
			.getUserProfile()
			.then(user => dispatch(setLoggedInUser(user)))
			.catch(console.error)
	}

	return (
		<>
			{/* <Navigation /> */}
			<main className={styles.layout}>
				{props.children}
				<NotificationContainer />
			</main>
		</>
	)
}

export default Layout
