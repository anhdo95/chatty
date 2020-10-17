import React, { useState, useEffect, useCallback } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller'

import apiService from '@/services/api.service'
import { Users } from '@/shared/interfaces/user'

import styles from './style.module.scss'

const LIMIT = 5

function AddFriendModal(props) {
	const [users, setUsers] = useState<Users>({
		items: [],
		totalItems: 0,
	})
	const [hasMore, setHasMore] = useState(true)
	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState()

	const loadUsers = useCallback(
		async function () {
			try {
				const nextUsers = await apiService.getUnfriendedUsers({
					limit: LIMIT,
					offset: users.items.length,
				})

				if (nextUsers.totalItems === users.items.length) {
					setHasMore(false)
				}

				setUsers({
					...nextUsers,
					items: users.items.concat(nextUsers.items),
				})
			} catch (error) {
				console.error(error)
			}
		},
		[users, setUsers, setHasMore]
	)

	function handleInputChange(event) {
		setSearchTerm(event.target.value)
	}

	function handleSearch(event) {
		event.preventDefault()
	}

	return (
		<Modal
			className={styles.modal}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={props.trigger}>
			<header className={styles.header}>
				Add friend
				<span className={styles.close} onClick={() => setOpen(false)}>
					&times;
				</span>
			</header>
			<div className={styles.content}>
				<Form className={styles.form} onSubmit={handleSearch}>
					<Form.Input
						fluid
						size="small"
						icon="search"
						iconPosition="right"
						name="term"
						placeholder="Enter your friend"
						value={searchTerm}
						onChange={handleInputChange}
					/>
				</Form>

				<ul className={styles.users}>
					<InfiniteScroll threshold={100} loadMore={loadUsers} hasMore={hasMore} useWindow={false}>
						{users &&
							users.items &&
							users.items.map(user => (
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
				</ul>
			</div>
		</Modal>
	)
}

export default AddFriendModal
