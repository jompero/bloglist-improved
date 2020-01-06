/* eslint-disable no-unused-vars */
import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import Submit from './Submit'

const Login = ({ login, setNotification }) => {
	const { reset: resetUsername, ...username } = useField('text')
	const { reset: resetPassword, ...password } = useField('password')

	const handleSubmit = (event) => {
		event.preventDefault()
		login(username.value, password.value)
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

const mapDispatchToProps = {
	setNotification,
	login: loginUser
}

export default connect(null, mapDispatchToProps)(Login)