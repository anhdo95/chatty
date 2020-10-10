import { wrapper } from '@/store'
import withProtectedRoute from '@/hocs/ProtectedRoute'
import withAnonymousRoute from '@/hocs/AnonymousRoute'
import Layout from '@/components/Layout'

import 'semantic-ui-css/semantic.min.css'
import 'react-notifications/lib/notifications.css'
import '../styles/globals.css'

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
