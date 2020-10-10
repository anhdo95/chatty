import React from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/reducers'
import { ResponseError } from '@/interfaces/error'

import styles from './style.module.css'

const notifyError = (error: ResponseError) => {
	NotificationManager.error(error.message, 'Opps!', 5000)
}

function Layout(props: React.Props<unknown>): JSX.Element {
	const error = useSelector<RootState, ResponseError>(state => state.app.error)

	if (error) {
		notifyError(error)
	}

	return (
		<main className={styles.layout}>
			{props.children}
			<NotificationContainer />
		</main>
	)
}

export default Layout
