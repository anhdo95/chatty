import React from 'react'

import Logo from '@/components/Logo'
import SignUpForm from '@/modules/auth/components/SignUpForm'

import styles from './style.module.scss'

function SignUp(): JSX.Element {
	return (
		<div className={styles.signUp}>
			<section className={styles.container}>
				<Logo />
				<h1 className={styles.heading}>Sign up Chatty account</h1>
				<SignUpForm />
			</section>
		</div>
	)
}

SignUp.middleware = ['anonymous']

export default SignUp
