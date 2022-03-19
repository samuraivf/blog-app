import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'

import { useAppSelector } from '../../redux/hooks'
import { LogoutAction } from '../../redux/reducers/account/actions'

import {
    CreateAccountLink,
    LogoLink,
    NavBox,
    NavContainer,
    SearchInput,
    CreatePost,
    Logout,
    UserBox,
    Nav,
    Hamburger,
    Bar
} from './styles'

import * as logoutIcon from '../../icons/logout.png'

const Navbar: React.FC = () => {
    const [ query, setQuery ] = useState('')
    const dispatch = useDispatch()
    const { user } = useAppSelector(state => state.account)
    const history = useHistory()
    const location = useLocation()

    const findResults = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && query) {
            setQuery('')
            history.push(`/search/${query}`)
        }
    }

    useEffect(() => {
        const navBox = document.querySelector('.navBox')
        
        navBox?.classList.remove('active')
    }, [location.pathname])

    const onClickHamburger = () => {
        const navBox = document.querySelector('.navBox')

        if (navBox) {
            navBox.classList.toggle('active')
        }
    }

    return (
        <Nav data-testid='nav'>
            <NavBox>
                <NavContainer>
                    <Hamburger onClick={onClickHamburger}>
                        <Bar />
                        <Bar />
                        <Bar />
                    </Hamburger>
                    <LogoLink data-testid='logo-link' onClick={() => history.push('/')}>BLOG</LogoLink>
                    <SearchInput 
                        type="text" 
                        placeholder='Search for a post...' 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        onKeyDown={(e) => findResults(e)}
                    />
                </NavContainer>
                <UserBox>
                    {user
                        ? (<>
                            <CreatePost data-testid='create-post-link' onClick={() => history.push('/write')}>Write a post</CreatePost>
                            <Logout
                                src={logoutIcon.default}
                                onClick={() => dispatch(LogoutAction())}
                            />
                        </>
                        )
                        : (
                            <CreateAccountLink data-testid='create-account-link' onClick={() => history.push('/account')}>
                                Create Account
                            </CreateAccountLink>
                        )
                    }
                </UserBox>
            </NavBox>
        </Nav>
    )
}

export default Navbar