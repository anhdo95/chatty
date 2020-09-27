import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/reducers'
import { Message, User } from '@/interfaces/chat'

import styles from './style.module.css'

function joinClass(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

function Messages(): JSX.Element {
	const messages = useSelector<RootState, Message[]>(state => state.chat.messages)
	const owner = useSelector<RootState, User>(state => state.chat.owner)

	return (
		<ul className={styles.messages}>
			{messages.map(message => {
				const isOwner = message.id === owner?.id

				return (
					<li className={joinClass(styles.message, isOwner && styles.sender)} key={message.id}>
						{!isOwner && (
							<figure className={styles.thumb}>
								<img
									className={styles.avatar}
									src="https://www.fromital.com/img/img_avatar_4.png"
									alt={message.user}
								/>
							</figure>
						)}
						<div className={joinClass(styles.details, isOwner && styles.sender)}>
							<p className={joinClass(styles.text, isOwner && styles.sender)}>{message.text}</p>
							<span className={styles.name}>{message.user}</span>
						</div>
					</li>
				)
			})}
		</ul>
	)
}

export default Messages
