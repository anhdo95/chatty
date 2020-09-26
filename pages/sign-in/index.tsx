import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Grid, Header } from 'semantic-ui-react'

import styles from './style.module.css'

function SignIn(): JSX.Element {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')

	const router = useRouter()

	const handleChange = useCallback(
		(event) => {
			const setter = {
				name: setName,
				room: setRoom,
			}[event.target.name]

			setter && setter(event.target.value)
		},
		[setName, setRoom]
	)

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault()
			if (!name.trim() || !room.trim()) return

			router.push({
				pathname: '/',
				query: {
					name,
					room,
				},
			})
		},
		[name, room, router]
	)

	return (
		<Grid className={styles.signIn}>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h1" color="teal" textAlign="center">
					Join into your room
				</Header>
				<Form size="large" onSubmit={handleSubmit}>
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						name="name"
						placeholder="Name"
						value={name}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						icon="chat"
						iconPosition="left"
						name="room"
						placeholder="Room"
						value={room}
						onChange={handleChange}
					/>

					<Button type="submit" color="teal" fluid size="large">
						Join
					</Button>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

export default SignIn
