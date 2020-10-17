import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import ReactEmoji from 'react-emoji'

import { RootState } from '@/store/reducers'
import { setMessages } from '@/modules/chat/store/actions'
import apiService from '@/services/api.service'
import { Messages as IMessages, Message } from '@/modules/chat/interfaces/message'
import { User } from '@/shared/interfaces/user'
import { Conversation } from '@/modules/chat/interfaces/conversation'
import socket from '@/core/socket'
import { classes } from '@/shared/util'

import styles from './style.module.scss'

const LIMIT = 10

function Messages(): JSX.Element {
	const messages = useSelector<RootState, IMessages>(state => state.chat.messages)
	const loggedInUser = useSelector<RootState, User>(state => state.auth.loggedInUser)
	const selectedRoom = useSelector<RootState, Conversation>(state => state.chat.selectedRoom)
	const [hasMore, setHasMore] = useState<boolean>(!!selectedRoom)
	const messagesRef = useRef<HTMLUListElement>()

	const dispatch = useDispatch()

	useEffect(() => {
		socket.receiveMessage((message: Message) => {
			if (message.user.id === loggedInUser.id) {
				messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
			}
		})
	}, [])

	useEffect(() => {
		if (!selectedRoom) return

		setHasMore(true)
	}, [selectedRoom])

	const loadMessages = useCallback(
		async function () {
			try {
				if (messages.totalItems && messages.items.length >= messages.totalItems) {
					return setHasMore(false)
				}

				const nextMessages = await apiService.getMessages({
					conversationId: selectedRoom.id,
					limit: LIMIT,
					offset: messages.items.length,
				})

				nextMessages.items.reverse()

				dispatch(
					setMessages({
						...nextMessages,
						items: nextMessages.items.concat(messages.items),
					})
				)
			} catch (error) {
				console.error(error)
			}
		},
		[messages, selectedRoom]
	)

	return (
		<ul ref={messagesRef} className={styles.messages}>
			<InfiniteScroll
				isReverse
				threshold={200}
				loadMore={loadMessages}
				hasMore={hasMore}
				useWindow={false}>
				{messages.items.map(message => {
					const isOwner = message.user?.id === loggedInUser.id
					const textClass = classes(styles.text, { [styles.sender]: isOwner })
					const detailsClass = classes(styles.details, { [styles.sender]: isOwner })
					const showThumb = !isOwner && message.user?.name

					return (
						<li className={classes(styles.message, { [styles.sender]: isOwner })} key={message.id}>
							{showThumb && (
								<figure className={styles.thumb}>
									{message.user.name.charAt(0).toUpperCase()}
									{/* <img
										className={styles.avatar}
										src="https://www.fromital.com/img/img_avatar_4.png"
										alt={message.user && message.user.name}
									/> */}
								</figure>
							)}
							<div className={detailsClass}>
								<p className={textClass}>{ReactEmoji.emojify(message.content)}</p>
								<span className={styles.name}>{message.user && message.user.name}</span>
							</div>
						</li>
					)
				})}
			</InfiniteScroll>
		</ul>
	)
}

export default Messages
