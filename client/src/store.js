import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
	blogs: blogsReducer,
	notification: notificationReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store