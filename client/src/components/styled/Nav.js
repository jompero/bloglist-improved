/* eslint-disable no-unused-vars */
import React from 'react'
import styled, { css } from 'styled-components'
import { Link as ReactRouterLink } from 'react-router-dom';

const Bar = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
`

const Item = styled.li`
    float: left;
    padding: 0.5em 1em;
    color: grey;
`

const Link = styled(({ active, ...props }) => <ReactRouterLink {...props} />)`
    float: left;
    text-align: center;
    padding: 0.5em 1em;
    color: white;
    text-decoration: none;

    :hover {
        background-color: black;
    }

    ${props => props.active && css`
        background: red;
        color: white;
    `}
`

const Text = styled.div`

`

export default { Bar, Item, Link, Text }