/* eslint-disable no-unused-vars */
import React from 'react'
import { useField } from '../hooks'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogsReducer'
import Submit from './Submit'
import { compose } from 'redux'

const Blog = ({ user, blogs, id, likeBlog, removeBlog, commentBlog, history }) => {
	const { reset: resetComment, ...comment } = useField('text')

	const blog = blogs.find(blog => blog.id === id)
	if (!blog) return null

	const onLike = () => {
		likeBlog(blog)
	}

	const onRemove = async () => {
		removeBlog(blog.id)
		history.push('/blogs')
	}

	const removeButton = () => {
		if (!user || blog.user.username !== user.username) return ''
		return <Submit text='Remove' handleClick={onRemove}/>
	}

	const postComment = (event) => {
		event.preventDefault()
		commentBlog(blog, comment.value)
		resetComment()
	}

	const styles = {
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			margin: '1rem',
			padding: '0.5rem',
			paddingLeft: '1rem',
			borderLeft: '1px solid'
		},
		user: {
			fontSize: '0.85rem'
		}
	}

	const comments = () => {
		if (!blog.comments) return null
		return blog.comments.map(comment => <li key={comment}>{comment}</li>)
	}

	return (
		<div className='blog' style={styles.container}>
			<h1>{blog.title}</h1>
			<p>{blog.author}</p>
			<div>
				<a href={blog.url}>{blog.url}</a>
				<p>{blog.likes} likes</p>
				<i style={styles.user}>Linked by {blog.user.username}</i>
				<div><Submit text='Like' handleClick={onLike} /> {removeButton()}</div>
				<h4>Comments</h4>
				<ul>
					{comments()}
				</ul>
			</div>
			<form onSubmit={postComment}>
				<div><label>Comment: </label><input style={styles.input} {...comment} /></div>
				<Submit />
			</form>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		blogs: state.blogs
	}
}

const mapDispatchToProps = {
	likeBlog,
	removeBlog,
	commentBlog
}

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Blog)