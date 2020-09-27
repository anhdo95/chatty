import { ProtectRoute } from '@/contexts/auth'
import socket, { ClientSocket } from '@/core/socket'
import { wrapper } from '@/store'

import Layout from '@/components/Layout'

import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	let WrappedComponent = Component

	if (Component.middleware?.includes('auth')) {
		WrappedComponent = ProtectRoute(WrappedComponent)
	}

	const appProps: AppProps = {
		...pageProps,
		socket,
	}

	return (
		<Layout>
			<WrappedComponent {...appProps} />
		</Layout>
	)
}

export interface AppProps {
	socket: ClientSocket
}

export default wrapper.withRedux(MyApp)
