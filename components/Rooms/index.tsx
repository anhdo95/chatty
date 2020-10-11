import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { formatDistance } from 'date-fns'
import { useRouter } from 'next/router'

import apiService from '@/services/api.service'
import { RootState } from '@/store/reducers'
import { setChatRooms, setSelectedRoom, resetMessages } from '@/store/actions/chat'
import { Conversations, Conversation } from '@/interfaces/conversation'

import styles from './style.module.css'

const LIMIT = 10

function formatDate(date) {
	return formatDistance(new Date(date), new Date())
}

function Rooms(props): JSX.Element {
	const rooms = useSelector<RootState, Conversations>(state => state.chat.rooms)
	const dispatch = useDispatch()
	const [hasMore, setHasMore] = useState<boolean>(true)

	const loadRooms = useCallback(
		async function (page: number) {
			try {
				const nextRooms = await apiService.getRooms({
					limit: LIMIT,
					offset: (page - 1) * LIMIT,
				})

				setHasMore(nextRooms.totalItems > page * LIMIT)
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
		[rooms]
	)

	function handleRoomClick(room: Conversation) {
		return function () {
			dispatch(resetMessages())
			dispatch(setSelectedRoom(room))
		}
	}

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<strong className={styles.heading}>Recent</strong>
			</header>
			<ul className={styles.rooms}>
				<InfiniteScroll threshold={100} loadMore={loadRooms} hasMore={hasMore} useWindow={false}>
					{rooms.items.map(room => (
						// eslint-disable-next-line
						<li
							className={[styles.room, styles.active].join(' ')}
							key={room.id}
							onClick={handleRoomClick(room)}>
							<figure className={styles.thumb}>
								<img className={styles.avatar} src={room.coverPhoto} alt={room.name} />
							</figure>
							<article className={styles.details}>
								<h3 className={styles.roomName}>{room.name}</h3>
								<p className={styles.lastMessage}>{room.lastMessage.content}</p>
							</article>
							<p className={styles.lastDate}>{formatDate(room.lastMessage.createdAt)}</p>
						</li>
					))}
				</InfiniteScroll>
			</ul>
		</section>
	)
}

export default Rooms
