import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import socket from '@/core/socket'
import Messages from '@/components/Messages'
import CommentBox from '@/components/CommentBox'
import Sidebar from '@/components/Sidebar'
import Summary from '@/components/Summary'
import Welcome from '@/components/Welcome'

import { RootState } from '@/store/reducers'
import { Conversation } from '@/shared/interfaces/conversation'
import { User } from '@/shared/interfaces/user'
import styles from './style.module.scss'

function Chat(): JSX.Element {
	const selectedRoom = useSelector<RootState, Conversation>(state => state.chat.selectedRoom)
	const loggedInUser = useSelector<RootState, User>(state => state.user.loggedInUser)

	useEffect(() => {
		socket.init()

		return socket.unsubscribe.bind(socket)
	}, [])

	return (
		loggedInUser && (
			<section className={styles.chat}>
				<Sidebar />
				<Summary />
				<div className={styles.conversation}>
					{selectedRoom ? (
						<div>
							<Messages />
							<CommentBox />
						</div>
					) : (
						<Welcome />
					)}
				</div>
			</section>
		)
	)
}

export default Chat
