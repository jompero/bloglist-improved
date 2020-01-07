/* eslint-disable no-undef */

const testUser = { name: 'Testi Kayttaja', username: 'tester', password: 'password' }
const testBlog = { title: 'Refactoring', author: 'Martin Fowler', url: 'https://refactoring.com' }

describe('Bloglist', function() {
	beforeEach(() => {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users/', testUser)
		cy.request('POST', 'http://localhost:3003/api/testing/blogs', testBlog)
		cy.visit('http://localhost:3000')
	})

	it('login presented on first entry', function() {
		cy.contains('Login')
	})

	describe('on login', function() {
		const title = 'Blog Title'
		const author = 'Author McAuthorFace'
		const url = 'not.areal.url'

		beforeEach(() => {
			cy.get('#username').type(testUser.username)
			cy.get('#password').type(testUser.password)
			cy.get('input:last').click()
		})

		it('login succesful', function() {
			cy.contains('Log out')
		})

		it('can view users', function() {
			cy.contains('Users').click()
			cy.contains(testUser.username)
		})

		it('can log out', function() {
			cy.contains('Log out').click()
			cy.contains('Login')
		})

		describe('blogs', function() {
			it('can be added', function() {
				cy.get('#\\+').click()
				cy.get('#title').type(title)
				cy.get('#author').type(author)
				cy.get('#url').type(url)
				cy.contains('Submit').click()
				cy.contains(title)
				cy.get(url).should('not.exist')
			})

			it('can be viewed', function() {
				cy.contains(testBlog.title).click()
				cy.contains(testBlog.url)
			})

			it('can be liked', function() {
				cy.contains(testBlog.title).click()
				cy.contains('0 likes')
				cy.contains('Like').click()
				cy.contains('1 likes')
			})
		})
	})
})