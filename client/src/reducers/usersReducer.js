import usersService from '../services/users'

const reducer = (state = null, action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
	case 'SET_USERS':
		return action.data
	default:
		return state
	}
}

export const initializeUsers = () => {
	return async dispatch => {
		const users = await usersService.getAll()
		dispatch({
			type: 'SET_USERS',
			data: users
		})
	}
}

export default reducer