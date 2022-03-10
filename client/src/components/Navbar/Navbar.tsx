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
        <Nav>
            <NavBox>
                <NavContainer>
                    <Hamburger onClick={onClickHamburger}>
                        <Bar />
                        <Bar />
                        <Bar />
                    </Hamburger>
                    <LogoLink onClick={() => history.push('/')}>BLOG</LogoLink>
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
                            <CreatePost onClick={() => history.push('/write')}>Write a post</CreatePost>
                            <Logout
                                src='https://cdn-icons.flaticon.com/png/512/3889/premium/3889524.png?token=exp=1641739621~hmac=206e601ff6a8116701e2f20b8517f169'
                                onClick={() => dispatch(LogoutAction())}
                            />
                        </>
                        )
                        : (
                            <CreateAccountLink onClick={() => history.push('/account')}>
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