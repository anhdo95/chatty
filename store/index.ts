import { createStore } from 'redux'
import { MakeStore, createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import reducers from './reducers'

// create a makeStore function
const makeStore: MakeStore = () => {
	const store = createStore(reducers, composeWithDevTools())
	globalThis.__store__ = store

	return store
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true })
