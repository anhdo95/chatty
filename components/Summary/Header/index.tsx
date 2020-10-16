import React, { useState } from 'react'
import { Form, Icon } from 'semantic-ui-react'

import styles from './style.module.css'

function Header() {
	const [searchTerm, setSearchTerm] = useState()

	function handleChange(event) {
		setSearchTerm(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
	}

	return (
		<header className={styles.header}>
			<h1 className={styles.heading}>Chatty - Do Dinh Anh</h1>
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
				<Icon className={styles.icon} name="user outline" size="large" />
				<Icon className={styles.icon} name="plus square outline" size="large" />
			</div>
		</header>
	)
}

export default Header
