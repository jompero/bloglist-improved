// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import Nav from './styled/Nav'

const Users = ({ users, initializeUsers }) => {
	useEffect(() => {
		initializeUsers()
	}, [initializeUsers])

	if (!users) return null

	const userList = () => {
		return users.map(user => {
			return (
				<Nav.Link key={user.id} to={`/users/${user.id}`}>{user.username}, {user.name}
					<Nav.Item right>{user.blogs.length} <i>blogs</i></Nav.Item>
				</Nav.Link>
			)
		})
	}

	return (
		<div>
			<h1>Users</h1>
			<Nav.Column>
				{userList()}
			</Nav.Column>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const mapDispatchToProps = {
	initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)