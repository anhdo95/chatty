import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'

import { RootState } from '@/store/reducers'
import { Friends as IFriends } from '@/modules/chat/interfaces/friend'
import { setFriends } from '@/modules/chat/store/actions'
import apiService from '@/services/api.service'

import styles from './style.module.scss'

const LIMIT = 15

function Friends() {
	const friends = useSelector<RootState, IFriends>(state => state.chat.friends)
	const [hasMore, setHasMore] = useState(true)
	const dispatch = useDispatch()

	const loadFriends = useCallback(async () => {
		try {
			const nextFriends = await apiService.getFriends({
				limit: LIMIT,
				offset: friends.items.length,
			})

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
					{friends.items.map(friend => (
						<li className={styles.friend} key={friend.id}>
							<div className={styles.avatar}>{friend.toUser.name.charAt(0).toUpperCase()}</div>
							<span className={styles.userName}>{friend.toUser.name}</span>
						</li>
					))}
				</InfiniteScroll>
			</ul>
		</section>
	)
}

export default Friends
