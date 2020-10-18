import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller'

import useDebounce from '@/shared/hooks/use-debounce'
import { Users } from '@/shared/interfaces/user'
import apiService from '@/services/api.service'

import styles from './style.module.scss'

const LIMIT = 10

function AddFriendModal(props) {
	const [users, setUsers] = useState<Users>({
		items: [],
		totalItems: 0,
	})
	const [hasMore, setHasMore] = useState(true)
	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState<string>()
	const debouncedSearchTerm = useDebounce(searchTerm, 500)
	const usersRef = useRef<HTMLUListElement>()

	useEffect(() => {
		loadUsers(true)

		usersRef.current?.scrollTo(0, 0)
	}, [debouncedSearchTerm])

	const loadUsers = useCallback(
		async (refresh?: boolean) => {
			try {
				const currentUsers = refresh ? [] : users.items

				const nextUsers = await apiService.getUnfriendedUsers({
					limit: LIMIT,
					offset: currentUsers.length,
					term: debouncedSearchTerm,
				})

				setHasMore(nextUsers.totalItems !== currentUsers.length)

				setUsers({
					...nextUsers,
					items: currentUsers.concat(nextUsers.items),
				})
			} catch (error) {
				console.error(error)
			}
		},
		[users, setUsers, debouncedSearchTerm]
	)

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}, [])

	const handleClose = useCallback(() => {
		setUsers({
			items: [],
			totalItems: 0,
		})
		setSearchTerm(null)
		setOpen(false)
	}, [])

	return (
		<Modal
			className={styles.modal}
			onClose={handleClose}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={props.trigger}>
			<header className={styles.header}>
				Add friend
				<span className={styles.close} onClick={handleClose}>
					&times;
				</span>
			</header>
			<div className={styles.content}>
				<Form.Input
					fluid
					size="small"
					icon="search"
					iconPosition="right"
					name="term"
					placeholder="Enter your friend"
					value={searchTerm}
					onChange={handleChange}
				/>

				<ul ref={usersRef} className={styles.users}>
					<InfiniteScroll
						threshold={100}
						loadMore={() => loadUsers()}
						hasMore={hasMore}
						initialLoad={false}
						useWindow={false}>
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
