/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import Submit from './Submit'
import { useField } from '../hooks'

const BlogForm = ({ setNotification, onBlogCreated, createBlog }) => {
	const { reset: resetTitle, ...title } = useField('text')
	const { reset: resetAuthor, ...author } = useField('text')
	const { reset: resetUrl, ...url } = useField('text')

	const onSubmitHandler = async (event) => {
		event.preventDefault()
		try {
			createBlog(title.value, author.value, url.value)
			setNotification('success', `Blog ${title.value} posted succesfully.`)

			resetTitle()
			resetAuthor()
			resetUrl()

			// onBlogCreated && onBlogCreated(blog)
		} catch (exception) {
			setNotification('danger', 'An error occured during blog posting. Please try again.')
		}
	}

	const styles = {
		container: {
			display: 'flex',
			justifyContent: 'space-between',
			width: '40%',
			margin: '0.5rem'
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			width: '40%',
		},
		input: {
			height: '1.5rem'
		}
	}

	return (
		<form onSubmit={onSubmitHandler} style={styles.form}>
			<label>Title</label><input {...title} style={styles.input} />
			<label>Author</label><input {...author} style={styles.input} />
			<label>URL</label><input {...url} style={styles.input} />
			<Submit text='Submit' />
		</form>
	)
}

const mapDispatchToProps = {
	createBlog,
	setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)