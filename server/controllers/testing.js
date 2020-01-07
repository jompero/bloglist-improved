const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

router.post('/reset', async (req, res) => {
	await Blog.deleteMany({})
	await User.deleteMany({})
  
	res.status(204).end()
})

router.post('/blogs', async (req, res) => {
	const blog = new Blog(req.body)
	const user = await User.findOne({})
	blog.user = user.id
	blog.likes = 0
	await blog.save()

	res.status(204).end()
})

module.exports = router