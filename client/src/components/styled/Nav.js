/* eslint-disable no-unused-vars */
import React from 'react'
import styled, { css } from 'styled-components'
import { Link as ReactRouterLink } from 'react-router-dom'

const Bar = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
`

const Column = styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
`

const Item = styled.li`
    padding: 0.5em 1em;
    color: grey;
    float: left;

    ${props => props.right && css`
        float: right;
    `}
`

const Link = styled(({ active, ...props }) => <ReactRouterLink {...props} />)`
    text-align: left;
    color: white;
    text-decoration: none;
    float: left;

    :hover {
        background-color: black;
    }

    ${Bar} & {
        padding: 0.5em 1em;
    }

    ${Column} & {
        padding-top: 1em;
        padding-left: 1em;
        line-height: 1.5em;
    }

    ${props => props.active && css`
        background: red;
        color: white;
    `}
`

export default { Column, Bar, Item, Link }