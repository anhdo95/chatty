import { wrapper } from '@/store'
import withProtectedRoute from '@/hocs/ProtectedRoute'
import withAnonymousRoute from '@/hocs/AnonymousRoute'
import Layout from '@/components/Layout'

import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
	let WrappedComponent = Component

	if (Component.middleware?.includes('auth')) {
		WrappedComponent = withProtectedRoute(WrappedComponent)
	}

	if (Component.middleware?.includes('anonymous')) {
		WrappedComponent = withAnonymousRoute(WrappedComponent)
	}

	return (
		<Layout>
			<WrappedComponent {...pageProps} />
		</Layout>
	)
}

export default wrapper.withRedux(MyApp)
