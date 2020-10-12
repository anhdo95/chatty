import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import ReactEmoji from 'react-emoji'

import { RootState } from '@/store/reducers'
import { setMessages, addMessage } from '@/store/actions/chat'
import apiService from '@/services/api.service'
import { Messages as IMessages, Message } from '@/interfaces/message'
import { User } from '@/interfaces/user'
import { Conversation } from '@/interfaces/conversation'
import socket from '@/core/socket'

import styles from './style.module.css'

const LIMIT = 10

function joinClass(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

function Messages(): JSX.Element {
	const messages = useSelector<RootState, IMessages>(state => state.chat.messages)
	const loggedInUser = useSelector<RootState, User>(state => state.user.loggedInUser)
	const selectedRoom = useSelector<RootState, Conversation>(state => state.chat.selectedRoom)
	const [hasMore, setHasMore] = useState<boolean>(!!selectedRoom)
	const infiniteScrollEl = useRef<any>()
	const messagesRef = useRef<HTMLUListElement>()

	const dispatch = useDispatch()

	useEffect(() => {
		socket.receiveMessage((message: Message) => {
			dispatch(addMessage(message))
			messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
		})
	}, [])

	useEffect(() => {
		if (!selectedRoom) return

		infiniteScrollEl.current.pageLoaded = 0
		setHasMore(true)
	}, [selectedRoom])

	const loadMessages = useCallback(
		async function (page = 1) {
			try {
				const nextMessages = await apiService.getMessages({
					conversationId: selectedRoom.id,
					limit: LIMIT,
					offset: (page - 1) * LIMIT,
				})

				nextMessages.items.reverse()

				setHasMore(nextMessages.totalItems > page * LIMIT)
				dispatch(
					setMessages({
						...nextMessages,
						items: nextMessages.items.concat(messages.items),
					})
				)

				if (page === 1) {
					socket.join(selectedRoom.id)
				}
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
				ref={infiniteScrollEl}
				threshold={200}
				loadMore={loadMessages}
				hasMore={hasMore}
				useWindow={false}>
				{messages.items.map(message => {
					const isOwner = message.user?.id === loggedInUser.id

					return (
						<li className={joinClass(styles.message, isOwner && styles.sender)} key={message.id}>
							{!isOwner && (
								<figure className={styles.thumb}>
									<img
										className={styles.avatar}
										src="https://www.fromital.com/img/img_avatar_4.png"
										alt={message.user && message.user.name}
									/>
								</figure>
							)}
							<div className={joinClass(styles.details, isOwner && styles.sender)}>
								<p className={joinClass(styles.text, isOwner && styles.sender)}>
									{ReactEmoji.emojify(message.content)}
								</p>
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
