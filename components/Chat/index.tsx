import React from 'react'

import Rooms from '@/components/Rooms'
import Messages from '@/components/Messages'
import CommentBox from '@/components/CommentBox'

import styles from './style.module.css'

function Chat(props): JSX.Element {
	return (
		<section className={styles.chat}>
			<h1 className={styles.heading}>Messaging</h1>
			<div className={styles.details}>
				<div className={styles.rooms}>
					<Rooms />
				</div>
				<div className={styles.conversation}>
					<Messages />
					<CommentBox />
				</div>
			</div>
		</section>
	)
}

export default Chat
