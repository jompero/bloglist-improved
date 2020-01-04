/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import Submit from './Submit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ onUserLoggedIn, logger }) => {
	const { reset: resetUsername, ...username } = useField('text')
	const { reset: resetPassword, ...password } = useField('password')

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: username.value, password: password.value,
			})

			window.localStorage.setItem(
				'loggedBloglistUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			onUserLoggedIn(user)
			resetUsername()
			resetPassword()
			logger('success', `Logged in as ${user.username}`)
		} catch (exception) {
			console.log(exception)
			logger('danger', 'Invalid username or password')
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
		<div styles={styles.container}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} style={styles.form}>
				<label>Username</label><input style={styles.input} {...username} />
				<label>Password</label><input style={styles.input} {...password} />
				<Submit text='Login' />
			</form>
		</div>
	)
}

Login.propTypes = {
	onUserLoggedIn: PropTypes.func.isRequired,
	logger: PropTypes.func.isRequired,
}

export default Login