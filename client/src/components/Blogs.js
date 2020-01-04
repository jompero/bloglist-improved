/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'

const Blogs = ({ user, visibleBlogs, initializeBlogs }) => {

	useEffect(() => {
		initializeBlogs()
	}, [initializeBlogs])

	const blogsList = () => {
		if (!visibleBlogs) return null

		return visibleBlogs.map(blog => {
			return (
				<Blog key={blog.id} blog={blog} user={user} />
			)
		})
	}

	const blogForm = () => {
		if (!user) return null
		return (
			<Toggleable showLabel="Post new blog" hideLabel="Cancel">
				<BlogForm user={user} />
			</Toggleable>
		)
	}

	return (
		<div>
			<div>{blogForm()}</div>
			<div>{blogsList()}</div>
		</div>
	)
}

const blogsToShow = ({ blogs }) => {
	return blogs
		.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		visibleBlogs: blogsToShow(state),
		filter: state.filter
	}
}

const mapDispatchToProps = {
	setNotification,
	initializeBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)