import React from 'react'

import styles from './style.module.css'

function Rooms(props) {
	const rooms = [1, 2, 3, 4, 5, 6, 7]

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<strong className={styles.heading}>Recent</strong>
			</header>
			<ul className={styles.rooms}>
				<li className={[styles.room, styles.active].join(' ')}>
					<figure className={styles.thumb}>
						<img
							className={styles.avatar}
							src="https://www.fromital.com/img/img_avatar_4.png"
							alt="User avatar"
						/>
					</figure>
					<article className={styles.details}>
						<h3 className={styles.roomName}>Javascript</h3>
						<p className={styles.lastMessage}>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</p>
					</article>
				</li>
				{rooms.map(room => (
					<li className={styles.room} key={room}>
						<figure className={styles.thumb}>
							<img
								className={styles.avatar}
								src="https://www.fromital.com/img/img_avatar_4.png"
								alt="User avatar"
							/>
						</figure>
						<article className={styles.details}>
							<h3 className={styles.roomName}>Javascript</h3>
							<p className={styles.lastMessage}>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
							</p>
						</article>
					</li>
				))}
			</ul>
		</section>
	)
}

export default Rooms
