import React from 'react'

import styles from './style.module.css'

function Logo(): JSX.Element {
	return (
		<figure className={styles.logo}>
			<img className={styles.image} src="/logo.png" alt="Logo" />
		</figure>
	)
}

export default Logo
