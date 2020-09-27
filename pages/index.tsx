import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
import Chat from '@/components/Chat'

import styles from '../styles/Home.module.css'

const socket: SocketIOClient.Socket = io('localhost:3000')

function Home(): JSX.Element {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])

	console.log('messages :>> ', messages)

	const router = useRouter()
	const { name, room } = router.query

	useEffect(() => {
		if (!name || !room) return

		socket.emit(
			'join',
			{
				name,
				room,
			},
			error => error && alert(error)
		)

		socket.on('message', newMessage => {
			console.log('newMessage :>> ', newMessage)
			setMessages(prevMessages => prevMessages.concat(newMessage))
		})

		return () => socket.off(null)
	}, [name, room])

	const handleMessageChange = useCallback(event => setMessage(event.target.value), [setMessage])
	const handleMessageKeyDown = useCallback(
		event => {
			event.preventDefault()
			if (event.keyCode !== 13 || !message.trim()) return

			socket.emit('sendMessage', message)
			setMessage('')
		},
		[message]
	)

	return (
		<div>
			<Chat />
			{/* <input value={message} onChange={handleMessageChange} onKeyUp={handleMessageKeyDown} /> */}
		</div>
	)
}

export default Home
