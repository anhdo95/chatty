import { createStore } from 'redux'
import { MakeStore, createWrapper } from 'next-redux-wrapper'

import reducers from './reducers'

// create a makeStore function
const makeStore: MakeStore = () => createStore(reducers)

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true })
