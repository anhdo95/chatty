import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { User } from '@/shared/interfaces/user'
import apiService from '@/services/api.service'
import { addFriend } from '@/modules/chat/store/actions'

import styles from './style.module.scss'

function Friend(props: Props): JSX.Element {
	const [unfriended, setUnfriended] = useState(true)
	const dispatch = useDispatch()

	const handleAddFriend = useCallback(async () => {
		try {
			const friend = await apiService.addFriend({
				toUserId: props.user.id,
			})

			dispatch(addFriend(friend))

			setUnfriended(false)
		} catch (error) {
			console.error(error)
		}
	}, [props.user])

	return (
		<li className={styles.user} key={props.user.id}>
			<div className={styles.avatar}>{props.user.name.charAt(0).toUpperCase()}</div>
			<div className={styles.userInfo}>
				<span className={styles.userName}>{props.user.name}</span>
				<span className={styles.userEmail}>{props.user.email}</span>
			</div>
			{unfriended && (
				<div className={styles.actions}>
					<Button type="button" color="teal" fluid size="mini" onClick={handleAddFriend}>
						Add friend
					</Button>
				</div>
			)}
		</li>
	)
}

interface Props {
	user: User
}

export default Friend
