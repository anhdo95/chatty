import React, { useState, useEffect } from 'react'

import socket from '@/core/socket'
import Rooms from '@/components/Rooms'
import Messages from '@/components/Messages'
import CommentBox from '@/components/CommentBox'
import Sidebar from '@/components/Sidebar'

import styles from './style.module.css'

function Chat(): JSX.Element {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		socket.init()
		setMounted(true)
	}, [])

	return (
		mounted && (
			<section className={styles.chat}>
				<Sidebar />
				{/* <h1 className={styles.heading}>Messaging</h1>
				<div className={styles.details}>
					<div className={styles.rooms}>
						<Rooms />
					</div>
					<div className={styles.conversation}>
						<Messages />
						<CommentBox />
					</div>
				</div> */}
			</section>
		)
	)
}

export default Chat
