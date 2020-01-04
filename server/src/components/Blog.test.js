/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
	let component
	let mockLikeHandler
	let removeHandler

	const user = {
		username: 'User',
	}

	const blog = {
		title: 'Blog Title',
		author: 'Author Name',
		url: 'www.dummy.com',
		likes: 2,
		user
	}

	beforeEach(() => {
		mockLikeHandler = jest.fn()
		removeHandler = jest.fn()

		component = render(<Blog
			blog={ blog }
			handleLike={ mockLikeHandler }
			handleRemove={ removeHandler }
			user={ user }/>)
	})

	test('renders blog with content hidden', () => {
		//component.debug()
		expect(component.container).toHaveTextContent('Blog Title')
		expect(component.container).toHaveTextContent('Author Name')

		const content = component.container.querySelector('.content')
		expect(content).toHaveStyle('display: none')
	})

	test('displays additional content on clicking the blog title', () => {
		const title = component.getByText('Blog Title, Author Name')
		fireEvent.click(title)
		const content = component.container.querySelector('.content')
		expect(content).toHaveStyle('display: block')
	})
})
