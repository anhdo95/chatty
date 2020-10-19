import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import Header from './Header'
import Rooms from './Rooms'
import Friends from './Friends'
import { RootState } from '@/store/reducers'
import { Tab } from '@/modules/chat/enums/tab'

import styles from './style.module.scss'

function Summary(): JSX.Element {
	const activeTab = useSelector<RootState, Tab>(state => state.chat.activeTab)

	const renderTabContent = useCallback(() => {
		switch (activeTab) {
			case Tab.Messages:
				return <Rooms />

			case Tab.Friends:
				return <Friends />

			default:
				return null
		}
	}, [activeTab])

	return (
		<div className={styles.summary}>
			<Header />
			{renderTabContent()}
		</div>
	)
}

export default Summary
