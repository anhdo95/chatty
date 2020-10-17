import React, { useEffect, useState, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

function withProtectedRoute(
	Component: FunctionComponent
): (props: React.Props<unknown>) => JSX.Element {
	function WrappedComponent(props: React.Props<unknown>) {
		const router = useRouter()
		const [mounted, setMounted] = useState<boolean>(null)

		useEffect(() => {
			if (!Cookies.get('token')) {
				router.replace('/sign-in')
			} else {
				setMounted(true)
			}
		}, [])

		return mounted && <Component {...props} />
	}

	return WrappedComponent
}

export default withProtectedRoute
