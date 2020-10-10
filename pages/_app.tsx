import { wrapper } from '@/store'
import withProtectedRoute from '@/hocs/ProtectedRoute'
import Layout from '@/components/Layout'

import 'semantic-ui-css/semantic.min.css'
import 'react-notifications/lib/notifications.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	let WrappedComponent = Component

	if (Component.middleware?.includes('auth')) {
		WrappedComponent = withProtectedRoute(WrappedComponent)
	}

	return (
		<Layout>
			<WrappedComponent {...pageProps} />
		</Layout>
	)
}

export default wrapper.withRedux(MyApp)
