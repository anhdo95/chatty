import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form, Button } from 'semantic-ui-react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import Link from 'next/link'

import { LoginRequest } from '@/modules/auth/interfaces/login'
import apiService from '@/services/api.service'

import styles from './style.module.scss'

function SignInForm(): JSX.Element {
	const formik = useFormik<LoginRequest>({
		initialValues: {
			email: 'richarddo@gmail.com',
			password: 'P@ssword1',
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.matches(
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
					'Password must be at least 8 characters and stronger'
				)
				.required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
		}),
		onSubmit: async values => {
			try {
				const { accessToken } = await apiService.login({
					email: values.email,
					password: values.password,
				})

				Cookies.set('token', accessToken)
				Router.push('/')
			} catch (error) {
				console.error(error)
			}
		},
	})

	function getErrorProps(key: string) {
		return (
			formik.touched[key] &&
			formik.errors[key] && { content: formik.errors[key], pointing: 'below' }
		)
	}

	return (
		<Form className={styles.form} onSubmit={formik.handleSubmit}>
			<div className={styles.formGroup}>
				<Form.Input
					fluid
					icon="mail"
					iconPosition="left"
					name="email"
					placeholder="Email"
					value={formik.values.email}
					error={getErrorProps('email')}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
				/>
			</div>

			<div className={styles.formGroup}>
				<Form.Input
					fluid
					icon="lock"
					iconPosition="left"
					type="password"
					name="password"
					placeholder="Password"
					value={formik.values.password}
					error={getErrorProps('password')}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
				/>
			</div>

			<Button type="submit" color="teal" fluid size="large">
				Login with password
			</Button>

			<p className={styles.message}>
				{`Don't have an account? `}
				<Link href="/sign-up">
					<a className={styles.signUpLink}>Register now!</a>
				</Link>
			</p>
		</Form>
	)
}

export default SignInForm
