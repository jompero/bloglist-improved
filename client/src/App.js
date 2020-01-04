/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Route, Link, Redirect, withRouter
} from 'react-router-dom'
import './App.css'
import blogsService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Submit from './components/Submit'

function App() {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogsService.setToken(user.token)
		}
	}, [])

	const handleUser = (user) => {
		setUser(user)
	}

	const logout = () => {
		window.localStorage.clear()
		setUser(null)
	}

	const loginForm = () => (<Login onUserLoggedIn={handleUser} />)
	const loggedIn = () => (
		<div>
			<p>Logged in as {user.username}<Submit text="Log out" handleClick={logout}/></p>
			<Blogs user={user} />
		</div>
	)

	return (
		<div className="App">
			<h1>Bloglist</h1>
			{user === null
				? loginForm()
				: loggedIn()}
			<Notification />
		</div>
	)
}

export default App
