import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../redux/hooks'

import { SaveIcons } from '../../utils/icons'

import FindTag from './../additional/FindTag/FindTag'
import FindUser from '../additional/FindUser/FindUser'
import FindPost from '../additional/FindPost/FindPost'

import * as homeIcon from '../../icons/home.png'
import * as postIcon from '../../icons/post.png'
import * as tagIcon from '../../icons/price-tag.png'
import * as accountIcon from '../../icons/user.png'
import * as followedIcon from '../../icons/add-user.png'

import './links.css'

const Links: React.FC = () => {
    const { user } = useAppSelector(state => state.account)
    const location = useLocation()
    const [classname, setClassname] = useState('none')

    useEffect(() => {
        switch (location.pathname.slice(0, 6)) {
            case '/':
            case '/oldes':
            case '/popul':
            case '/my-po':
            case '/follo':
            case '/saved':
            case '/searc':
            case '/users':
                setClassname('')
                break
            case '/tags/':
                if (location.pathname.slice(0, 8) !== '/tags') {
                    setClassname('')
                    break
                }
                setClassname('none')
                break
            default:
                setClassname('none')
        }
    }, [location])

    const checkPath = (path: string): string => {
        if (user && user.id) return path
        return '/not-authorized'
    }

    return (
        <div data-testid='links' className={`navBox ${classname}`}>
            <div className='links' >
                <div className='linkBox'>
                    <NavLink data-testid='home-link' to='/' className='link' activeClassName='activeLink' exact>
                        <img className='img' src={homeIcon.default} alt="" />
                        Home
                    </NavLink>

                    <NavLink to='/tags' data-testid='tags-link' className='link' activeClassName='activeLink' >
                        <img className='img' src={tagIcon.default} alt="" />
                        Tags
                    </NavLink>

                    <NavLink data-testid='my-posts-link' to={checkPath('/my-posts')} className='link' activeClassName='activeLink' >
                        <img className='img' src={postIcon.default} alt="" />
                        My Posts
                    </NavLink>

                    <NavLink data-testid='saved-link' to={checkPath('/saved')} className='link' activeClassName='activeLink' exact>
                        <img className='img' src={SaveIcons.saved} alt="" />
                        Saved
                    </NavLink>

                    <NavLink data-testid='account-link' to={checkPath(`/user/${user?.id}`)} className='link' activeClassName='activeLink' exact>
                        <img className='img' src={accountIcon.default} alt="" />
                        Account
                    </NavLink>

                    <NavLink data-testid='followed-link' to={checkPath('/followed-posts')} className='link' activeClassName='activeLink' exact>
                        <img className='img' src={followedIcon.default} alt="" />
                        Followed
                    </NavLink>
                </div>

                <FindTag />
                <FindUser />
                <FindPost />
            </div>
        </div>
    )
}

export default Links