import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../redux/hooks'

import { SaveIcons } from '../../utils/icons'

import FindTag from './../additional/FindTag/FindTag'
import FindUser from '../additional/FindUser/FindUser'
import FindPost from '../additional/FindPost/FindPost'

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
        <div className={`navBox ${classname}`}>
            <div className='links' >
                <div className='linkBox'>
                    <NavLink to='/' className='link' activeClassName='activeLink' exact>
                        <img className='img' src="https://cdn-icons-png.flaticon.com/256/1946/1946436.png" alt="" />
                        Home
                    </NavLink>

                    <NavLink to='/tags' className='link' activeClassName='activeLink' >
                        <img className='img' src="https://cdn-icons.flaticon.com/png/512/721/premium/721550.png?token=exp=1641739814~hmac=dcc4528abb40e53d356cdc5d9785efa6" alt="" />
                        Tags
                    </NavLink>

                    <NavLink to={checkPath('/my-posts')} className='link' activeClassName='activeLink' >
                        <img className='img' src="https://cdn-icons-png.flaticon.com/512/3596/3596817.png" alt="" />
                        My Posts
                    </NavLink>

                    <NavLink to={checkPath('/saved')} className='link' activeClassName='activeLink' exact>
                        <img className='img' src={SaveIcons.saved} alt="" />
                        Saved
                    </NavLink>

                    <NavLink to={checkPath(`/user/${user?.id}`)} className='link' activeClassName='activeLink' exact>
                        <img className='img' src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png' alt="" />
                        Account
                    </NavLink>

                    <NavLink to={checkPath('/followed-posts')} className='link' activeClassName='activeLink' exact>
                        <img className='img' src='https://cdn-icons.flaticon.com/png/512/3756/premium/3756602.png?token=exp=1645795911~hmac=aa68d0192dfe25ad3d61b72dd1cb9b19' alt="" />
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