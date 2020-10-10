import React, { useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './style.module.css'

function Navigation(): JSX.Element {
	const router = useRouter()
	const [activeItem, setActiveItem] = useState<string>()

	useEffect(() => {
		setActiveItem(router.pathname)
	}, [router.pathname])

	function handleItemClick({ target }) {
		setActiveItem(target.dataset.name)
	}

	function handleSignOut() {
		event.preventDefault()
		Cookies.remove('token')
		return void router.replace('/sign-in')
	}

	return (
		<Menu fixed="top" className={styles.menu}>
			<Menu.Item className={styles.menuItem}>
				<img
					src="https://anhdo95.github.io/images/logo-2xd93cd71b6f14a396ef5120edec06073f.png"
					alt="Logo"
				/>
			</Menu.Item>

			<Link href="/">
				<Menu.Item
					className={styles.menuItem}
					data-name="/"
					data-active={activeItem === '/'}
					onClick={handleItemClick}>
					Chat
				</Menu.Item>
			</Link>

			<Link href="/sign-up">
				<Menu.Item
					className={styles.menuItem}
					data-name="/sign-up"
					data-active={activeItem === '/sign-up'}
					onClick={handleItemClick}>
					Sign up
				</Menu.Item>
			</Link>

			<Link href="/sign-in">
				<Menu.Item
					className={styles.menuItem}
					data-name="/sign-in"
					data-active={activeItem === '/sign-in'}
					onClick={handleItemClick}>
					Sign in
				</Menu.Item>
			</Link>

			<Menu.Menu position="right">
				<Menu.Item className={styles.menuItem} onClick={handleSignOut}>
					Sign out
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	)
}

export default Navigation
