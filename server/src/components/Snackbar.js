/* eslint-disable no-unused-vars */
import React from 'react'

const Snackbar = (props) => {
	const { label } = props
	const { type } = props

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

	console.log(type, 'message', label)
	return (
		<div style={styles.container}>
			<div style={styles.label}>{label}</div>
		</div>
	)
}

export default Snackbar