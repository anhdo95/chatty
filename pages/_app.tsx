import { ProtectRoute } from '@/contexts/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  let WrappedComponent = Component

  if (Component.middleware?.includes('auth')) {
    WrappedComponent = ProtectRoute(WrappedComponent)
  }

  return <WrappedComponent {...pageProps} />
}

export default MyApp
