import React from 'react'

import Logo from '@/shared/components/Logo'
import SignInForm from '@/modules/auth/components/SignInForm'

import styles from './style.module.scss'

function SignIn(): JSX.Element {
	return (
		<div className={styles.signIn}>
			<section className={styles.container}>
				<Logo />
				<h1 className={styles.heading}>Sign in with your Chatty account</h1>
				<SignInForm />
			</section>
		</div>
	)
}

SignIn.middleware = ['anonymous']

export default SignIn
