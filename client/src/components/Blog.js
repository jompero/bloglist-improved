/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import Toggleable from './Toggleable'
import Submit from './Submit'

const Blog = ({ user, blog, setNotification, likeBlog, removeBlog }) => {

	const blogFormRef = React.createRef()

	const toggleContent = () => {
		blogFormRef.current.toggleContent()
	}

	const onLike = async () => {
		try {
			await likeBlog(blog)
			setNotification('success', `Liked ${blog.title}! :)`)
		} catch(exception) {
			// console.log(exception)
			setNotification('danger', 'Error occured while liking... :(')
		}
	}

	const onRemove = async () => {
		try {
			removeBlog(blog.id)
			setNotification('success', `Blog ${blog.title} removed!`)
		} catch(exception) {
			console.log(exception)
			setNotification('danger', 'Error occured while removing...')
		}
	}

	const removeButton = () => {
		if (!user || blog.user.username !== user.username) return ''
		return <Submit text='Remove' handleClick={onRemove}/>
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

	return (
		<div className='blog' style={styles.container}>
			<div onClick={toggleContent}>{blog.title}, {blog.author}</div>
			<Toggleable ref={blogFormRef}>
				<div>
					<a href={blog.url}>{blog.url}</a>
					<p>{blog.likes} likes <Submit text='Like' handleClick={onLike} /></p>
					<i style={styles.user}>Linked by {blog.user.username}</i>
					{removeButton()}
				</div>
			</Toggleable>
		</div>
	)
}

const mapStateToProps = (state) => {
	return { user: state.user }
}

const mapDispatchToProps = {
	likeBlog,
	removeBlog,
	setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)