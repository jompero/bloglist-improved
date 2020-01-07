/* eslint-disable no-unused-vars */
import React from 'react'
const Submit = ({ text='Submit', handleClick }) => {
	const onClickHandler = (event) => {
		handleClick && handleClick()
	}

	const style = {
		backgroundColor: 'grey',
		margin: '1em 0',
		border: 'none',
		fontSize: '1.25em',
		textDecoration: 'none',
		cursor: 'pointer'
	}

	return (<input onClick={onClickHandler} type='submit' value={text} style={style}></input>)
}

export default Submit