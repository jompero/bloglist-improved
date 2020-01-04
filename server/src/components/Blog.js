/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Toggleable from './Toggleable'
import Submit from './Submit'
import blogService from '../services/blogs'

const Blog = (props) => {
	const { logger } = props
	const [blog, setBlog] = useState(props.blog)
	// console.log(blog)

	const blogFormRef = React.createRef()

	const toggleContent = () => {
		blogFormRef.current.toggleContent()
	}

	const onLike = async () => {
		try {
			const likedBlog = await blogService.like(blog)
			// console.log(likedBlog)
			setBlog(likedBlog)
			props.handleLike(likedBlog)
			logger('success', `Liked ${blog.title}! :)`)
		} catch(exception) {
			// console.log(exception)
			logger('danger', 'Error occured while liking... :(')
		}
	}

	const onRemove = async () => {
		try {
			const removedBlog = await blogService.remove(blog)
			props.handleRemove(blog)
			logger('success', `Blog ${blog.title} removed!`)
		} catch(exception) {
			// console.log(exception)
			logger('danger', 'Error occured while removing...')
		}
	}

	const removeButton = () => {
		if (!props.user || blog.user.username !== props.user.username) return ''
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

export default Blog