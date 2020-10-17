import React, { useState, useCallback } from 'react'
import { Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import { useSocket } from '@/contexts/socket'
import { RootState } from '@/store/reducers'
import { Conversation } from '@/interfaces/conversation'

import styles from './style.module.scss'

function CommentBox(): JSX.Element {
	const selectedRoom = useSelector<RootState, Conversation>(state => state.chat.selectedRoom)
	const [message, setMessage] = useState('')
	const socket = useSocket()

	const handleSubmit = useCallback(
		event => {
			event.preventDefault()
			if (!message.trim()) return

			socket.sendMessage({
				content: message,
				conversationId: selectedRoom.id,
			})
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
