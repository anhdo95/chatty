import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Icon } from 'semantic-ui-react'

import AddFriendModal from '@/modules/chat/components/AddFriendModal'

import { RootState } from '@/store/reducers'
import { User } from '@/shared/interfaces/user'

import styles from './style.module.scss'

function Header() {
	const loggedInUser = useSelector<RootState, User>(state => state.auth.loggedInUser)
	const [searchTerm, setSearchTerm] = useState()

	function handleChange(event) {
		setSearchTerm(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
	}

	return (
		<header className={styles.header}>
			<h1 className={styles.heading}>Chatty - {loggedInUser.name}</h1>
			<div className={styles.actions}>
				<Form onSubmit={handleSubmit}>
					<Form.Input
						fluid
						size="mini"
						icon="search"
						iconPosition="left"
						name="term"
						placeholder="Search friends groups and messages"
						value={searchTerm}
						onChange={handleChange}
					/>
				</Form>
				<AddFriendModal trigger={<Icon className={styles.icon} name="add user" />} />
				<Icon className={styles.icon} name="plus square" />
			</div>
		</header>
	)
}

export default Header
