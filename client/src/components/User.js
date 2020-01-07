/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'

const User = ({ users, id }) => {
	const user = users.find(user => user.id === id)
	if (!user) return null

	const styles = {
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			margin: '1rem',
			padding: '0.5rem',
			paddingLeft: '1rem',
			borderLeft: '1px solid'
		},
		user: {
			fontSize: '0.85rem'
		}
	}

	const blogs = () => {
		return user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
	}

	return (
		<div className='blog' style={styles.container}>
			<h1>{user.username}</h1>
			<p>{user.name}</p>
			<div>
				<h4>Blogs posted ({user.blogs.length})</h4>
				<ul>
					{blogs()}
				</ul>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

export default connect(mapStateToProps)(User)