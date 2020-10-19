import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import Cookies from 'js-cookie'
import Router from 'next/router'

import { setLoggedInUser } from '@/modules/auth/store/actions'
import { setActiveTab } from '@/modules/chat/store/actions'
import { Tab } from '@/modules/chat/enums/tab'
import { classes } from '@/shared/util'
import { RootState } from '@/store/reducers'
import styles from './style.module.scss'

function Sidebar() {
	const activeTab = useSelector<RootState, Tab>(state => state.chat.activeTab)
	const dispatch = useDispatch()

	function handleTabClick(tab: Tab) {
		return function () {
			dispatch(setActiveTab(tab))
		}
	}

	const handleSignOut = useCallback(function () {
		if (!window.confirm('Are you sure?')) return

		event.preventDefault()
		dispatch(setLoggedInUser(null))
		Cookies.remove('token')

		return void Router.replace('/sign-in')
	}, [])

	return (
		<nav className={styles.sidebar}>
			<div className={styles.avatar}>A</div>
			<ul className={styles.tabs}>
				<li
					className={classes(styles.tab, { [styles.active]: activeTab === Tab.Messages })}
					onClick={handleTabClick(Tab.Messages)}>
					<Icon className={styles.tabIcon} size="big" name="comment alternate outline" />
				</li>
				<li
					className={classes(styles.tab, { [styles.active]: activeTab === Tab.Friends })}
					onClick={handleTabClick(Tab.Friends)}>
					<Icon className={styles.tabIcon} size="big" name="address book outline" />
				</li>
			</ul>
			<div className={styles.bottom}>
				<span className={styles.iconBox} onClick={handleSignOut}>
					<Icon className={styles.signOutIcon} size="big" name="sign-out" />
				</span>
			</div>
		</nav>
	)
}

export default Sidebar
