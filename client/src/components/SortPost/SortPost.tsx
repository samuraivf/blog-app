import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { LoadByTag } from './../../redux/redux-iterfaces/tags/tags'

import classes from './styles.module.css'

interface ISortPostLink {
    to: string
    name: string
    arg?: string
    pagination?: number
    onClick?: (payload: number) => void
    onClickWithArg?: (payload: LoadByTag) => void
}

const SortPostLink: React.FC<ISortPostLink> = ({
    to,
    name,
    arg,
    pagination,
    onClick,
    onClickWithArg
}) => {
    const dispatch = useDispatch()

    const click = (): void => {
        if (onClick && pagination) { 
            return dispatch(onClick(pagination)) 
        }

        if (onClickWithArg && arg) {
            return dispatch(onClickWithArg({ arg, from: pagination || 0 }))
        }
    }

    return (
        <NavLink
            to={to}
            className={classes.link}
            activeClassName={classes.activeLink}
            exact
            onClick={click}
        >
            {name}
        </NavLink>
    )
}

export default SortPostLink
