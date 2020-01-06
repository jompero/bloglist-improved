import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Route } from 'react-router-dom'
import Nav from './styled/Nav'

const Menu = ({ user, logoutUser }) => {
	if (!user) return null

	const logout = () => {
		logoutUser()
	}

	const userInfo = () => {
		if (!user) return null
		return (
			<div>
				<Nav.Item><i>Logged in as { user.username }</i></Nav.Item>
				<Nav.Link to='/' onClick={() => logout()}>Log out</Nav.Link>
			</div>
		)
	}

	const isActive = (match, matcher) => {
		return match.params.path.toLowerCase() === matcher
	}

	const navBar = (match) => {
		return (
			<Nav.Bar>
				<Nav.Item>Bloglist</Nav.Item>
				<Nav.Link active={isActive(match, 'blogs')} to='/blogs'>Blogs</Nav.Link>
				<Nav.Link active={isActive(match, 'users')} to='/users'>Users</Nav.Link>
				{ userInfo() }
			</Nav.Bar>
		)
	}
	return (
		<nav>
			<Route path='/:path' render={({ match }) => navBar(match)} />
		</nav>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)