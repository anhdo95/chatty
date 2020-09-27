import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Chat from '@/components/Chat'
import * as chat from '@/store/actions/chat'
import { User, Message } from '@/interfaces/chat'
import { AppProps } from '@/pages/_app'

function Home(props: AppProps): JSX.Element {
	const dispatch = useDispatch()

	const router = useRouter()
	const { name, room } = router.query

	useEffect(() => {
		if (!name || !room) return

		props.socket
			.join({ name: name as string, room: room as string })
			.then((user: User) => dispatch(chat.setOwner(user)))
			.catch((error: string) => alert(error))

		props.socket.receiveMessage((message: Message) => dispatch(chat.addMessage(message)))

		return () => props.socket.unsubscribe()
	}, [name, room])

	// const handleMessageChange = useCallback(event => setMessage(event.target.value), [setMessage])
	// const handleMessageKeyDown = useCallback(
	// 	event => {
	// 		event.preventDefault()
	// 		if (event.keyCode !== 13 || !message.trim()) return

	// 		socket.emit('sendMessage', message)
	// 		setMessage('')
	// 	},
	// 	[message]
	// )

	return <Chat />
}

export default Home
