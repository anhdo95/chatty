import React from 'react'

import styles from './style.module.css'

function Layout(props) {
	return <main className={styles.layout}>{props.children}</main>
}

export default Layout
