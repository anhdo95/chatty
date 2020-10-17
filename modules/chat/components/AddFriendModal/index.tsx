import React, { useState } from 'react'
import { Form, Button, Icon, Modal } from 'semantic-ui-react'

import styles from './style.module.scss'

function AddFriendModal(props) {
	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState()

	function handleInputChange(event) {
		setSearchTerm(event.target.value)
	}

	function handleSearch(event) {
		event.preventDefault()
	}

	return (
		<Modal
			className={styles.modal}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={props.trigger}>
			<header className={styles.header}>
				Add friend
				<span className={styles.close} onClick={() => setOpen(false)}>
					&times;
				</span>
			</header>
			<div className={styles.content}>
				<Form className={styles.form} onSubmit={handleSearch}>
					<Form.Input
						fluid
						size="small"
						icon="search"
						iconPosition="right"
						name="term"
						placeholder="Enter your friend"
						value={searchTerm}
						onChange={handleInputChange}
					/>
				</Form>

				<ul className={styles.users}>
					<li className={styles.user}>
						<div className={styles.avatar}>A</div>
						<div className={styles.userInfo}>
							<span className={styles.userName}>Richard Do</span>
							<span className={styles.userEmail}>richarddo@gmail.com</span>
						</div>
						<div className={styles.actions}>
							<Button type="button" color="teal" fluid size="mini">
								Add friend
							</Button>
						</div>
					</li>

					<li className={styles.user}>
						<div className={styles.avatar}>A</div>
						<div className={styles.userInfo}>
							<span className={styles.userName}>Richard Do</span>
							<span className={styles.userEmail}>richarddo@gmail.com</span>
						</div>
						<div className={styles.actions}>
							<Button type="button" color="teal" fluid size="mini">
								Add friend
							</Button>
						</div>
					</li>
				</ul>
			</div>
		</Modal>
	)
}

export default AddFriendModal
