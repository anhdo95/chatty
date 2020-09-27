import React, { useState, useCallback } from 'react'
import { Icon } from 'semantic-ui-react'

import { useSocket } from '@/contexts/socket'

import styles from './style.module.css'

function CommentBox(): JSX.Element {
	const [message, setMessage] = useState('')
	const socket = useSocket()

	const handleSubmit = useCallback(
		event => {
			event.preventDefault()
			if (!message.trim()) return

			socket.sendMessage(message)
			setMessage('')
		},
		[message]
	)

	const handleChange = useCallback(event => setMessage(event.target.value), [])

	return (
		<form className={styles.commentBox} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				placeholder="Type a message ..."
				value={message}
				onChange={handleChange}
			/>
			<button className={styles.button}>
				<Icon className={styles.icon} name="send" />
			</button>
		</form>
	)
}

export default CommentBox
