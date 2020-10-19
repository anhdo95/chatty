import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Form, Modal } from 'semantic-ui-react'

import styles from './style.module.scss'

function AddRoomModal() {
	const [open, setOpen] = useState(false)

	const handleClose = useCallback(() => {
		setOpen(false)
	}, [])

	const handleOpen = useCallback(() => {
		setOpen(true)
	}, [])

	return (
		<Modal
			className={styles.modal}
			onClose={handleClose}
			onOpen={handleOpen}
			open={open}
			trigger={props.trigger}>
			<header className={styles.header}>
				Add friend
				<span className={styles.close} onClick={handleClose}>
					&times;
				</span>
			</header>
			<div className={styles.content}>
				<Form.Input
					fluid
					size="small"
					icon="search"
					iconPosition="right"
					name="term"
					placeholder="Enter group name"
					// value={searchTerm}
					// onChange={handleChange}
				/>
			</div>
		</Modal>
	)
}

export default AddRoomModal
