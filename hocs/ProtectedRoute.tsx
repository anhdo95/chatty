import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

function withProtectedRoute(Component): (props: React.Props<unknown>) => JSX.Element {
	function WrappedComponent(props: React.Props<unknown>) {
		const router = useRouter()

		useEffect(() => {
			if (!Cookies.get('token')) {
				router.push('/login')
			}
		}, [])

		return <Component {...props} />
	}

	return WrappedComponent
}

export default withProtectedRoute
