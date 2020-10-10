import { createStore } from 'redux'
import { MakeStore, createWrapper } from 'next-redux-wrapper'

import reducers from './reducers'

// create a makeStore function
const makeStore: MakeStore = () => {
	const store = createStore(reducers)
	globalThis.__store__ = store

	return store
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true })
