/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import blogsService from '../services/blogs'

const Blogs = ({ user, logger }) => {
	const sort = (blogsArray) => {
		return blogsArray.sort((a, b) => b.likes - a.likes)
	}

	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const blogs = await blogsService.getAll()
			setBlogs(sort(blogs))
			// console.log(blogs)
		}
		fetchData()
	}, [])

	const onLike = (likedBlog) => {
		let updatedBlogs = blogs.map((blog) => blog.id === likedBlog.id
			? likedBlog
			: blog)
		setBlogs(sort(updatedBlogs))
	}

	const appendBlog = (blog) => {
		blog.user=user
		setBlogs(blogs.concat(blog))
	}

	const removeBlog = (removedBlog) => {
		const shorterList = blogs.filter((blog) => blog.id !== removedBlog.id)
		setBlogs(shorterList)
	}

	const blogsList = () => {
		if (!blogs) return ''

		return blogs.map(blog => {
			return (
				<Blog key={blog.id} blog={blog} user={user} handleLike={onLike} handleRemove={removeBlog} logger={logger}/>
			)
		})
	}

	const blogForm = () => {
		if (!user) return ''
		return (
			<Toggleable showLabel="Post new blog" hideLabel="Cancel">
				<BlogForm user={user} logger={logger} onBlogCreated={appendBlog}/>
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

export default Blogs