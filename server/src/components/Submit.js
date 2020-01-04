/* eslint-disable no-unused-vars */
import React from 'react'
const Submit = ({ text, handleClick }) => {
	const onClickHandler = (event) => {
		handleClick && handleClick()
	}

	const style = {
		margin: 5,
		fontSize: 24
	}

	return (<input onClick={onClickHandler} type='submit' value={text} style={style}></input>)
}

export default Submit