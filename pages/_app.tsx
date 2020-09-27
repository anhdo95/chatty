import { ProtectRoute } from '@/contexts/auth'
import { wrapper } from '@/store'

import Layout from '@/components/Layout'

import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	let WrappedComponent = Component

	if (Component.middleware?.includes('auth')) {
		WrappedComponent = ProtectRoute(WrappedComponent)
	}

	return (
		<Layout>
			<WrappedComponent {...pageProps} />
		</Layout>
	)
}

export default wrapper.withRedux(MyApp)
