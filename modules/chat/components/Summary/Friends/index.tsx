import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'

import socket from '@/core/socket'
import { RootState } from '@/store/reducers'
import apiService from '@/services/api.service'
import { Friends as IFriends, Friend } from '@/modules/chat/interfaces/friend'
import { Conversation } from '@/modules/chat/interfaces/conversation'
import { Message } from '@/modules/chat/interfaces/message'
import {
	setFriends,
	resetMessages,
	setSelectedRoom,
	addMessage,
} from '@/modules/chat/store/actions'
import { classes } from '@/shared/util'

import styles from './style.module.scss'

const LIMIT = 15

function Friends() {
	const friends = useSelector<RootState, IFriends>(state => state.chat.friends)
	const selectedRoom = useSelector<RootState, Conversation>(state => state.chat.selectedRoom)
	const [hasMore, setHasMore] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		socket.receiveMessage((message: Message) => {
			dispatch(addMessage(message))
		})

		return socket.unsubscribe.bind(socket)
	}, [])

	const loadFriends = useCallback(async () => {
		try {
			const nextFriends = await apiService.getFriends({
				limit: LIMIT,
				offset: friends.items.length,
			})

			if (!friends.items.length && nextFriends.items.length) {
				createConversation(nextFriends.items[0])
			}

			if (nextFriends.totalItems === friends.items.length) {
				setHasMore(false)
			}

			dispatch(
				setFriends({
					items: friends.items.concat(...nextFriends.items),
					totalItems: nextFriends.totalItems,
				})
			)
		} catch (error) {
			console.error(error)
		}
	}, [friends])

	const createConversation = useCallback(async (friend: Friend) => {
		try {
			const room = await apiService.addRoom({
				name: friend.toUser.name,
				userIds: [friend.toUserId],
			})

			socket.join(room.id)

			dispatch(resetMessages())
			dispatch(setSelectedRoom(room))
		} catch (error) {
			console.error(error)
		}
	}, [])

	const handleFriendClick = useCallback((friend: Friend) => () => createConversation(friend), [])

	return (
		<section className={styles.container}>
			<span className={styles.label}>Friends ({friends.totalItems})</span>
			<ul className={styles.friends}>
				<InfiniteScroll
					threshold={100}
					loadMore={loadFriends}
					hasMore={hasMore}
					initialLoad={true}
					useWindow={false}>
					{friends.items.map(friend => {
						const active = selectedRoom?.users?.every(user =>
							[friend.fromUserId, friend.toUserId].includes(user.id)
						)

						return (
							<li
								className={classes(styles.friend, { [styles.active]: active })}
								key={friend.id}
								onClick={handleFriendClick(friend)}>
								<div className={styles.avatar}>{friend.toUser.name.charAt(0).toUpperCase()}</div>
								<span className={styles.userName}>{friend.toUser.name}</span>
							</li>
						)
					})}
				</InfiniteScroll>
			</ul>
		</section>
	)
}

export default Friends
