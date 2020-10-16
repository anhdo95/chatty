import React from 'react'

import Header from './Header'
import Rooms from './Rooms'

import styles from './style.module.css'

function Summary() {
	return (
		<div className={styles.summary}>
			<Header />
			<Rooms />
		</div>
	)
}

export default Summary
