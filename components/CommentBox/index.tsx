import React, { useState, useCallback } from 'react'
import { Icon } from 'semantic-ui-react'

import styles from './style.module.css'

function CommentBox(props) {
	const [message, setMessage] = useState('')

	const handleChange = useCallback(event => setMessage(event.target.value), [])

	return (
		<div className={styles.commentBox}>
			<input
				className={styles.input}
				placeholder="Type a message ..."
				value={message}
				onChange={handleChange}
			/>
			<button className={styles.button}>
				<Icon className={styles.icon} name="send" />
			</button>
		</div>
	)
}

export default CommentBox
