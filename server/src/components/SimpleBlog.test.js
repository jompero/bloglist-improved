/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('SimpleBlog', () => {
	const blog = {
		title: 'Blog Title',
		author: 'Author Name',
		likes: 2
	}

	test('renders blog content', () => {
		const component = render(<SimpleBlog blog={blog}/>)

		expect(component.container).toHaveTextContent('Blog Title')
		expect(component.container).toHaveTextContent('Author Name')
		expect(component.container).toHaveTextContent('blog has 2 likes')
	})

	test('fires an event twice when clicking like twice', () => {
		const mockHandler = jest.fn()

		const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)

		const likeButton = getByText('like')
		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(mockHandler.mock.calls.length).toBe(2)
	})
})
