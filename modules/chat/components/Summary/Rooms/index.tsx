import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { formatDistance } from 'date-fns'

import socket from '@/core/socket'
import apiService from '@/services/api.service'
import { RootState } from '@/store/reducers'
import {
	setChatRooms,
	setSelectedRoom,
	resetMessages,
	addMessage,
} from '@/modules/chat/store/actions'
import { Conversations, Conversation } from '@/modules/chat/interfaces/conversation'
import { Message } from '@/modules/chat/interfaces/message'
import { classes } from '@/shared/util'
import localStorage from '@/shared/util/local-storage'

import styles from './style.module.scss'

const LIMIT = 10

function formatDate(date) {
	return formatDistance(new Date(date), new Date())
}

function Rooms(): JSX.Element {
	const rooms = useSelector<RootState, Conversations>(state => state.chat.rooms)
	const selectedRoom = useSelector<RootState, Conversation>(state => state.chat.selectedRoom)

	const dispatch = useDispatch()
	const [hasMore, setHasMore] = useState<boolean>(true)

	useEffect(() => {
		if (localStorage('selectedRoom')) {
			setRoom(localStorage('selectedRoom'))
		}
	}, [])

	useEffect(() => {
		socket.receiveMessage((message: Message) => {
			dispatch(addMessage(message))
		})

		return socket.unsubscribe.bind(socket)
	}, [])

	const loadRooms = useCallback(
		async function () {
			try {
				const nextRooms = await apiService.getRooms({
					limit: LIMIT,
					offset: rooms.items.length,
				})

				if (nextRooms.totalItems === rooms.items.length) {
					setHasMore(false)
				}

				nextRooms.items.forEach(room => socket.join(room.id))

				dispatch(
					setChatRooms({
						...nextRooms,
						items: rooms.items.concat(nextRooms.items),
					})
				)
			} catch (error) {
				console.error(error)
			}
		},
		[rooms, setHasMore]
	)

	function setRoom(room) {
		dispatch(resetMessages())
		dispatch(setSelectedRoom(room))
	}

	function handleRoomClick(room: Conversation) {
		return function () {
			setRoom(room)
			localStorage('selectedRoom', room)
		}
	}

	return (
		<section className={styles.container}>
			<span className={styles.label}>Messages</span>
			<ul className={styles.rooms}>
				<InfiniteScroll threshold={150} loadMore={loadRooms} hasMore={hasMore} useWindow={false}>
					{rooms.items.map(room => (
						<li
							className={classes(styles.room, { [styles.active]: selectedRoom?.id === room.id })}
							key={room.id}
							onClick={handleRoomClick(room)}>
							<figure className={styles.thumb}>
								{room.name.charAt(0).toUpperCase()}
								{/* <img className={styles.avatar} src={room.coverPhoto} alt={room.name} /> */}
							</figure>
							<article className={styles.details}>
								<h3 className={classes('text-ellipsis', styles.roomName)}>{room.name}</h3>
								<p className={classes('text-ellipsis', styles.lastMessage)}>
									{room.lastMessage.content}
								</p>
								<p className={styles.lastDate}>{formatDate(room.lastMessage.createdAt)} ago</p>
							</article>
						</li>
					))}
				</InfiniteScroll>
			</ul>
		</section>
	)
}

export default Rooms
