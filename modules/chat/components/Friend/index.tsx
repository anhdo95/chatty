import React, { useState, useCallback } from 'react'
import { Button } from 'semantic-ui-react'

import { User } from '@/shared/interfaces/user'
import apiService from '@/services/api.service'

import styles from './style.module.scss'

function Friend(props: Props): JSX.Element {
	const [unfriended, setUnfriended] = useState(true)

	const handleAddFriend = useCallback(async () => {
		try {
			await apiService.addFriend({
				toUserId: props.user.id,
			})

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
