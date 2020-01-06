/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Route, Link, Redirect, withRouter
} from 'react-router-dom'
import './App.css'
import { connect } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import Menu from './components/Menu'
import Login from './components/Login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Container from './components/styled/Container'

const App = ({ user, initializeUser }) => {
	useEffect(() => {
		initializeUser()
	}, [initializeUser])

	const app = () => (
		<div>
			<Menu />
			<Route exact path='/' render={() => <Blogs />} />
			<Route exact path='/blogs' render={() => <Blogs />} />
			<Route exact path='/blogs/:id' render={() => null} />
			<Route exact path='/users' render={() => <Users />} />
			<Route exact path='/users/:id' render={() => null} />
		</div>
	)

	return (
		<Router>
			<Notification />
			{user && app()}
			{!user && <Login />}
		</Router>
	)
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	initializeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
