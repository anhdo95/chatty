import React, { useEffect, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

function withAnonymousRoute(
	Component: FunctionComponent
): (props: React.Props<unknown>) => JSX.Element {
	function WrappedComponent(props: React.Props<unknown>) {
		const router = useRouter()

		useEffect(() => {
			if (Cookies.get('token')) {
				router.replace('/')
			}
		}, [])

		return <Component {...props} />
	}

	return WrappedComponent
}

export default withAnonymousRoute
