import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { RootState } from '@/store/reducers'
import { User } from '@/shared/interfaces/user'

import styles from './style.module.scss'
import { setLoggedInUser } from '@/store/actions/user'

function Navigation(): JSX.Element {
	const loggedInUser = useSelector<RootState, User>(state => state.user.loggedInUser)
	const router = useRouter()
	const dispatch = useDispatch()
	const [activeItem, setActiveItem] = useState<string>()

	const menuItems = useMemo(
		() =>
			[
				{ path: '/', text: 'Chat', auth: true },
				{ path: '/sign-up', text: 'Sign up', auth: false },
				{ path: '/sign-in', text: 'Sign in', auth: false },
			].filter(item => item.auth === !!loggedInUser),
		[loggedInUser]
	)

	useEffect(() => {
		setActiveItem(router.pathname)
	}, [router.pathname])

	const handleSignOut = useCallback(
		function () {
			event.preventDefault()
			dispatch(setLoggedInUser(null))
			Cookies.remove('token')

			return void router.replace('/sign-in')
		},
		[router]
	)

	return (
		<Menu fixed="top" className={styles.menu}>
			<Menu.Item className={styles.menuItem}>
				<img
					src="https://anhdo95.github.io/images/logo-2xd93cd71b6f14a396ef5120edec06073f.png"
					alt="Logo"
				/>
			</Menu.Item>

			{menuItems.map(menuItem => (
				<Link href={menuItem.path} key={menuItem.path}>
					<Menu.Item
						className={styles.menuItem}
						data-name={menuItem.path}
						data-active={activeItem === menuItem.path}>
						{menuItem.text}
					</Menu.Item>
				</Link>
			))}

			{loggedInUser && (
				<Menu.Menu position="right">
					<Menu.Item className={styles.menuItem} onClick={handleSignOut}>
						Sign out
					</Menu.Item>
				</Menu.Menu>
			)}
		</Menu>
	)
}

export default Navigation
