import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import Friend from '@/modules/chat/components/Friend'
import { User } from '@/shared/interfaces/user'

import styles from './style.module.scss'

function Friends(props: Props): JSX.Element {
	return (
		<InfiniteScroll
			threshold={100}
			loadMore={props.onLoadMore}
			hasMore={props.hasMore}
			initialLoad={false}
			useWindow={false}>
			{props.users && props.users.map(user => <Friend user={user} key={user.id} />)}
		</InfiniteScroll>
	)
}

interface Props {
	users: User[]
	hasMore: boolean
	onLoadMore: () => void
}

export default Friends
