import React from 'react'
import Chat from '@/modules/chat/components/Chat'

function Home(): JSX.Element {
	return <Chat />
}

Home.middleware = ['auth']

export default Home
