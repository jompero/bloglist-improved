import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = () => {
	return {
		headers: { Authorization: token },
	}
}

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (blog) => {
	const response = await axios.post(baseUrl, blog, config())
	return response.data
}

const like = async (blog) => {
	blog.likes = blog.likes + 1
	blog.user = blog.user.id
	const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config())
	return response.data
}

const remove = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`, config())
	return response.data
}

const comment = async (blog, comment) => {
	blog.comments = blog.comments.concat(comment)
	blog.user = blog.user.id
	console.log('Sending comment', blog)
	const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config())
	return response.data
}

export default { getAll, setToken, create, like, remove, comment }