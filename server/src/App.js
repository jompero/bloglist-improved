/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './App.css'
import blogsService from './services/blogs'
import Login from './components/Login'
import SnackBar from './components/Snackbar'
import Blogs from './components/Blogs'
import Submit from './components/Submit'

function App() {
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState({})

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

	const log = (type, label) => {
		setMessage({ type, label })
		setTimeout(() => {
			setMessage({})
		}, 5000)
	}

	const logout = () => {
		window.localStorage.clear()
		setUser(null)
	}

	const loginForm = () => (<Login onUserLoggedIn={handleUser} logger={log}/>)
	const loggedIn = () => (
		<div>
			<p>Logged in as {user.username}<Submit text="Log out" handleClick={logout}/></p>
			<Blogs user={user} logger={log}/>
		</div>
	)
	const snackBar = () => (<SnackBar type={message.type} label={message.label} />)

	return (
		<div className="App">
			<h1>Bloglist</h1>
			{user === null
				? loginForm()
				: loggedIn()}
			{message.label && snackBar()}
		</div>
	)
}

export default App
