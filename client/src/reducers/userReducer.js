import loginService from '../services/login'
import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
	case 'SET_USER':
		return action.data
	case 'CLEAR_USER':
		return null
	default:
		return state
	}
}

const setUser = (user) => {
	return {
		type: 'SET_USER',
		data: user
	}
}

const clearUser = () => {
	return { type: 'CLEAR_USER' }
}

export const initializeUser = () => {
	return dispatch => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (!loggedUserJSON) {
			dispatch(clearUser())
		} else {
			const user = JSON.parse(loggedUserJSON)
			blogsService.setToken(user.token)
			dispatch(setUser(user))
		}
	}
}

export const loginUser = (username, password) => {
	return async dispatch => {
		try {
			const user = await loginService.login({
				username: username, password: password
			})
			window.localStorage.setItem(
				'loggedBloglistUser', JSON.stringify(user)
			)
			blogsService.setToken(user.token)
			dispatch(setUser(user))
			dispatch(setNotification('success', 'Succesfully logged in'))
		} catch (error) {
			dispatch(setNotification('danger', 'Invalid username or password'))
		}
	}
}

export const logoutUser = () => {
	return dispatch => {
		dispatch(clearUser())
		window.localStorage.clear()
		blogsService.setToken('')
	}
}

export default reducer