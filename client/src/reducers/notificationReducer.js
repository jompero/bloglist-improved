const reducer = (state = null, action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
	case 'NOTIFY':
		return action.data
	case 'RESET':
		if (action.data !== state.id) return state
		return null
	default:
		return state
	}
}

// With id, I can make sure that the previous timeOut doesn't reset a newer notification too early
let nextId = 1
export const setNotification = (type, message, time=5) => {
	let thisId = nextId
	nextId++
	return async dispatch => {
		dispatch({
			type: 'NOTIFY',
			data: { type, message, id: thisId }
		})
		setTimeout(() => {
			dispatch({
				type: 'RESET',
				data: thisId
			})
		}, time * 1000)
	}
}

export const resetNotification = () => {
	return { type: 'RESET' }
}

export default reducer