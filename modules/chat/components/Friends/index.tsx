import React from 'react'
import { Button } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller'

import styles from './style.module.scss'

function Friends(props): JSX.Element {
	return (
		<InfiniteScroll
			threshold={100}
			loadMore={props.onLoadMore}
			hasMore={props.hasMore}
			initialLoad={false}
			useWindow={false}>
			{props.friends &&
				props.friends.map(user => (
					<li className={styles.user} key={user.id}>
						<div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
						<div className={styles.userInfo}>
							<span className={styles.userName}>{user.name}</span>
							<span className={styles.userEmail}>{user.email}</span>
						</div>
						<div className={styles.actions}>
							<Button type="button" color="teal" fluid size="mini">
								Add friend
							</Button>
						</div>
					</li>
				))}
		</InfiniteScroll>
	)
}

export default Friends
