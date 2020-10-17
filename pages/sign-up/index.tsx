import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form, Button } from 'semantic-ui-react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import Link from 'next/link'

import { RegisterRequest } from '@/shared/interfaces/register'
import apiService from '@/services/api.service'

import styles from './style.module.scss'
import Logo from '@/components/Logo'

function SignUp(): JSX.Element {
	const formik = useFormik<RegisterRequest>({
		initialValues: {
			name: '',
			password: '',
			email: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
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
				await apiService.register(values)
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
		<div className={styles.signUp}>
			<section className={styles.container}>
				<Logo />
				<h1 className={styles.heading}>Sign up Chatty account</h1>
				<Form className={styles.form} onSubmit={formik.handleSubmit}>
					<div className={styles.formGroup}>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							name="name"
							placeholder="Name"
							value={formik.values.name}
							error={getErrorProps('name')}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						/>
					</div>

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
						Register an account
					</Button>

					<p className={styles.message}>
						Already have an account?{' '}
						<Link href="/sign-in">
							<a className={styles.signInLink}>Login now!</a>
						</Link>
					</p>
				</Form>
			</section>
		</div>
	)
}

SignUp.middleware = ['anonymous']

export default SignUp
