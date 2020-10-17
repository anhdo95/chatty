import React from 'react'
import Logo from '@/shared/components/Logo'

import styles from './style.module.scss'

function Welcome() {
	return (
		<div className={styles.welcome}>
			<div className={styles.container}>
				<Logo />
				<p className={styles.title}>Welcome to Chatty!</p>
				<p className={styles.message}>
					Explore the best features to support your work and allow you to chat with your friends and
					family. All are optimized for your device!
				</p>
			</div>
		</div>
	)
}

export default Welcome
