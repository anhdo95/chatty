import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { useSocket } from '@/contexts/socket'
import { User, Message } from '@/interfaces/chat'
import * as chat from '@/store/actions/chat'

import Chat from '@/components/Chat'

function Home(): JSX.Element {
	const dispatch = useDispatch()
	const socket = useSocket()
	const router = useRouter()

	const { name, room } = router.query

	useEffect(() => {
		if (!name || !room) return

		socket
			.join({ name: name as string, room: room as string })
			.then((user: User) => dispatch(chat.setOwner(user)))
			.catch((error: string) => alert(error))

		socket.receiveMessage((message: Message) => dispatch(chat.addMessage(message)))

		return () => socket.unsubscribe()
	}, [name, room])

	return <Chat />
}

Home.middleware = ['auth']

export default Home
