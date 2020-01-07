/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import Submit from './Submit'
import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
	const { reset: resetTitle, ...title } = useField('text')
	const { reset: resetAuthor, ...author } = useField('text')
	const { reset: resetUrl, ...url } = useField('text')

	const onSubmitHandler = (event) => {
		event.preventDefault()
		createBlog(title.value, author.value, url.value)
		resetTitle()
		resetAuthor()
		resetUrl()
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
			<label>Title</label><input id='title' {...title} style={styles.input} />
			<label>Author</label><input id='author' {...author} style={styles.input} />
			<label>URL</label><input id='url' {...url} style={styles.input} />
			<Submit />
		</form>
	)
}

const mapDispatchToProps = {
	createBlog
}

export default connect(null, mapDispatchToProps)(BlogForm)