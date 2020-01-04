/* eslint-disable no-unused-vars */
import React, { useState, useImperativeHandle } from 'react'
import Submit from './Submit'

const Toggleable = React.forwardRef(({ showLabel, hideLabel, children } , ref) => {
	const [visible, setVisible] = useState(false)

	useImperativeHandle(ref, () => {
		return {
			toggleContent
		}
	})

	const toggleContent = () => {
		setVisible(!visible)
	}

	const visibilityButton = () => {
		let label
		if (visible && hideLabel) label = hideLabel
		if (!visible && showLabel) label = showLabel
		if (!label) return ''
		return <Submit handleClick={toggleContent} text={label} />
	}

	const styles = {
		container: {

		},
		content: {
			display: visible ? '' : 'none'
		}
	}

	return (
		<div style={styles.container}>
			<div className='content' style={styles.content}>{children}</div>
			<div>{visibilityButton()}</div>
		</div>
	)
})

export default Toggleable