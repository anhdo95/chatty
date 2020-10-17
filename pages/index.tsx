import React from 'react'
import Chat from '@/components/Chat'

function Home(): JSX.Element {
	return <Chat />
}

Home.middleware = ['auth']

export default Home
