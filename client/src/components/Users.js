// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = ({ users, initializeUsers }) => {
	useEffect(() => {
		initializeUsers()
	}, [initializeUsers])

	if (!users) return null

	const userList = () => {
		const list = users.map(user => {
			return (
				<tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>
			)
		})
		return (
			<table>
				<tbody>
					<tr><th>Name:</th><th>Blogs</th></tr>
					{list}
				</tbody>
			</table>
		)
	}

	return (
		<div>
			<h1>Users</h1>
			{userList()}
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