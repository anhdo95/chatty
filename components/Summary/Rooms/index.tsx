import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { formatDistance } from 'date-fns'

import apiService from '@/services/api.service'
import { RootState } from '@/store/reducers'
import { setChatRooms, setSelectedRoom, resetMessages } from '@/store/actions/chat'
import { Conversations, Conversation } from '@/interfaces/conversation'
import { joinClass } from '@/util'

import styles from './style.module.css'

const LIMIT = 10

function formatDate(date) {
	return formatDistance(new Date(date), new Date())
}

function Rooms(): JSX.Element {
	const rooms = useSelector<RootState, Conversations>(state => state.chat.rooms)
	const selectedRoom = useSelector<RootState, Conversation>(state => state.chat.selectedRoom)

	const dispatch = useDispatch()
	const [hasMore, setHasMore] = useState<boolean>(true)

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

	function handleRoomClick(room: Conversation) {
		return function () {
			dispatch(resetMessages())
			dispatch(setSelectedRoom(room))
		}
	}

	return (
		<section className={styles.container}>
			<span className={styles.label}>Messages</span>
			<ul className={styles.rooms}>
				<InfiniteScroll threshold={150} loadMore={loadRooms} hasMore={hasMore} useWindow={false}>
					{rooms.items.map(room => (
						<li
							className={joinClass(styles.room, selectedRoom?.id === room.id && styles.active)}
							key={room.id}
							onClick={handleRoomClick(room)}>
							<figure className={styles.thumb}>
								{room.name.charAt(0).toUpperCase()}
								{/* <img className={styles.avatar} src={room.coverPhoto} alt={room.name} /> */}
							</figure>
							<article className={styles.details}>
								<h3 className={styles.roomName}>{room.name}</h3>
								<p className={styles.lastMessage}>{room.lastMessage.content}</p>
							</article>
							<p className={styles.lastDate}>{formatDate(room.lastMessage.createdAt)} ago</p>
						</li>
					))}
				</InfiniteScroll>
			</ul>
		</section>
	)
}

export default Rooms
