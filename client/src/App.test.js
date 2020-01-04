import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('App', () => {
	test('if no user logged, blogs are not rendered', async () => {
		let component
		component = render(
			<App />
		)
		component.rerender(<App />)

		await waitForElement(
			() => component.getAllByText('Login')
		)

		expect(component.container).not.toHaveTextContent('React patterns, Michael Chan')

		const blogs = component.container.querySelectorAll('.blog')
		expect(blogs.length).toBe(0)
	})

	test('blogs are rendered when logged in', async () => {
		const user = {
			username: 'tester',
			token: '1231231214',
			name: 'Donald Tester'
		}

		localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

		let component

		component = render(
			<App />
		)
		component.rerender(<App />)

		await waitForElement(
			() => component.container.querySelector('.blog')
		)

		const blogs = component.container.querySelectorAll('.blog')
		expect(blogs.length).toBe(6)
	})
})