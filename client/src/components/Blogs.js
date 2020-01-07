/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import Nav from './styled/Nav'

const Blogs = ({ user, visibleBlogs }) => {

	const blogsList = () => {
		if (!visibleBlogs) return null

		const list = visibleBlogs.map(blog => {
			return (
				<Nav.Link to={`/blogs/${blog.id}`} key={blog.id}>
					{blog.title} <Nav.Item right>{blog.author}</Nav.Item>
				</Nav.Link>
			)
		})

		return (
			<Nav.Column>
				{list}
			</Nav.Column>
		)
	}

	const blogForm = () => {
		if (!user) return null
		return (
			<Toggleable showLabel="+" hideLabel="-">
				<BlogForm />
			</Toggleable>
		)
	}

	return (
		<div>
			<h1>Blogs</h1>
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
	return {
		visibleBlogs: blogsToShow(state),
		filter: state.filter,
		user: state.user
	}
}

export default connect(mapStateToProps)(Blogs)