/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
	if (!props.notification) return null

	const { type, message } = props.notification

	const containerColor = () => {
		switch(type) {
		case 'danger': return 'red'
		case 'success': return 'green'
		default: return'#555555'
		}
	}

	const styles = {
		container: {
			position: 'fixed',
			left: 0,
			bottom: 0,
			backgroundColor: containerColor(),
			margin: 10,
			padding: 10,
			verticalAlign: 'center',
		},
		label: {
			color: 'white',
			lineHeight: 1.25,
			margin: 2,
			padding: 5,
		}
	}

	console.log(type, 'message', message)
	return (
		<div style={styles.container}>
			<div style={styles.label}>{message}</div>
		</div>
	)
}


const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(
	mapStateToProps
)(Notification)