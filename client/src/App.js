/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Route, Link, Redirect, withRouter
} from 'react-router-dom'
import './App.css'
import { connect } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import Menu from './components/Menu'
import Login from './components/Login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Container from './components/styled/Container'

const App = ({ user, initializeUser, initializeBlogs, initializeUsers }) => {
	useEffect(() => {
		initializeUser()
		initializeBlogs()
		initializeUsers()
	}, [initializeUser, initializeBlogs, initializeUsers])

	const app = () => (
		<div>
			<Menu />
			<Container>
				<Route exact path='/' render={() => <Blogs />} />
				<Route exact path='/blogs' render={() => <Blogs />} />
				<Route exact path='/blogs/:id' render={
					({ match }) => <Blog id={ match.params.id } />
				} />
				<Route exact path='/users' render={() => <Users />} />
				<Route exact path='/users/:id' render={
					({ match }) => <User id={ match.params.id } />
				} />
			</Container>
		</div>
	)

	return (
		<Router>
			<Notification />
			{user && app()}
			{!user && <Container><Login /></Container>}
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
	initializeUser,
	initializeBlogs,
	initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
