import blogsService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
	case 'INIT_BLOGS':
		return action.data
	case 'EDIT_BLOG':
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
		try {
			const blog = await blogsService.like(id)
			dispatch({
				type: 'EDIT_BLOG',
				data: blog
			})
			dispatch(setNotification('success', `Liked ${blog.title}! :)`))
		} catch (exception) {
			console.log(exception)
			dispatch(setNotification('danger', 'Error occured while liking... :('))
		}
	}
}

export const createBlog = (title, author, url) => {
	return async dispatch => {
		try {
			const blog = await blogsService.create({ title, author, url })
			dispatch({
				type: 'CREATE_BLOG',
				data: blog
			})
			dispatch(setNotification('success', 'Blog added!'))
		} catch (exception) {
			console.log(exception)
			dispatch(setNotification('danger', 'Something went wrong! D:'))
		}

	}
}

export const removeBlog = (id) => {
	return async dispatch => {
		try {
			await blogsService.remove(id)
			dispatch({
				type: 'REMOVE_BLOG',
				data: id
			})
			dispatch(setNotification('success', 'Blog removed!'))
		} catch(exception) {
			console.log(exception)
			dispatch(setNotification('danger', 'Error occured while trying to remove the blog...'))
		}
	}
}

export const commentBlog = (blog, comment) => {
	return async dispatch => {
		try {
			const commentedBlog = await blogsService.comment(blog, comment)
			dispatch({
				type: 'EDIT_BLOG',
				data: commentedBlog
			})
			dispatch(setNotification('success', 'Commented!'))
		} catch (exception) {
			console.log(exception)
			dispatch(setNotification('danger', 'Error occured while commenting... ;_;'))
		}
	}
}

export default reducer