import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
	case 'INIT_BLOGS':
		return action.data
	case 'LIKE_BLOG':
		return state.map((blog) => blog.id === action.data.id
			? action.data
			: blog)
	case 'CREATE_BLOG':
		return [ ...state, action.data ]
	case 'REMOVE_BLOG':
		return state.filter((blog) => blog.id !== action.data)
	default:
		return state
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogsService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs,
		})
	}
}

export const likeBlog = (id) => {
	return async dispatch => {
		const blog = await blogsService.like(id)
		dispatch({
			type: 'LIKE_BLOG',
			data: blog
		})
	}
}

export const createBlog = (title, author, url) => {
	return async dispatch => {
		const blog = await blogsService.create({ title, author, url })
		dispatch({
			type: 'CREATE_BLOG',
			data: blog
		})
	}
}

export const removeBlog = (id) => {
	return async dispatch => {
		await blogsService.remove(id)
		dispatch({
			type: 'REMOVE_BLOG',
			data: id
		})
	}
}

export default reducer