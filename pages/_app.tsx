import { wrapper } from '@/store'
import withProtectedRoute from '@/shared/hocs/ProtectedRoute'
import withAnonymousRoute from '@/shared/hocs/AnonymousRoute'
import Layout from '@/shared/components/Layout'

import '@/styles/globals.scss'

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
