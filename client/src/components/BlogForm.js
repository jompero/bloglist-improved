/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Submit from './Submit'
import blogsService from '../services/blogs'
import { useField } from '../hooks'

const BlogForm = ({ logger, onBlogCreated }) => {
	const { reset: resetTitle, ...title } = useField('text')
	const { reset: resetAuthor, ...author } = useField('text')
	const { reset: resetUrl, ...url } = useField('text')

	const onSubmitHandler = async (event) => {
		event.preventDefault()
		try {
			const blog = await blogsService.create({
				title: title.value, author: author.value, url: url.value,
			})
			resetTitle()
			resetAuthor()
			resetUrl()
			logger('success', `Blog ${blog.title} posted succesfully.`)
			onBlogCreated && onBlogCreated(blog)
		} catch (exception) {
			logger('danger', 'An error occured during blog posting. Please try again.')
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

export default BlogForm