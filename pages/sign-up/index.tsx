import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Header, Form, Button } from 'semantic-ui-react'

import styles from './style.module.css'
import { RegisterRequest } from '@/interfaces/register'
import apiService from '@/services/api.service'

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
					'Password must be at least 8 characters and strong'
				)
				.required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
		}),
		onSubmit: async values => {
			const response = await apiService.register(values)
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
				<Header as="h1" color="teal" textAlign="center">
					Register an account
				</Header>
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
						Register
					</Button>
				</Form>
			</section>
		</div>
	)
}

export default SignUp
