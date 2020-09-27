import React from 'react'

import styles from './style.module.css'

function Messages(props) {
	const messages = [1, 2, 4, 5, 6, 7, 8, 9]

	return (
		<ul className={styles.messages}>
			<li className={[styles.message, styles.sender].join(' ')}>
				<div className={[styles.details, styles.sender].join(' ')}>
					<p className={[styles.text, styles.sender].join(' ')}>
						Test which is a new approach to have all solutions
					</p>
					<span className={styles.name}>Richard Do</span>
				</div>
			</li>

			{messages.map(message => (
				<li className={styles.message} key={message}>
					<figure className={styles.thumb}>
						<img
							className={styles.avatar}
							src="https://www.fromital.com/img/img_avatar_4.png"
							alt="User avatar"
						/>
					</figure>
					<div className={styles.details}>
						<p className={styles.text}>Test which is a new approach to have all solutions</p>
						<span className={styles.name}>Richard Do</span>
					</div>
				</li>
			))}
		</ul>
	)
}

export default Messages
