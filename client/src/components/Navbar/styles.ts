import styled from 'styled-components'

import { Button } from './../styled-components/Button'
import { Input } from './../styled-components/Input'

export const Nav = styled.nav`
    background-color: #FFF;
    height: 3rem;
    border-bottom: 1px solid #ccc;
    padding: .5rem;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;

    @media screen nd (max-width: 768px) {
        height 4rem;
    }
`

export const Hamburger = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        cursor: pointer;
        padding: 0 .8rem;
    }
`

export const Bar = styled.div`
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #101010;
`

export const NavBox = styled.div`
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    height: 2.3rem;
    width: 100%;
    padding: 0 4rem;
    align-items: center;

    @media screen and (max-width: 768px) {
        padding: 0;
    }
`

export const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const LogoLink = styled.div`
    background-color: #000;
    color: #FFF;
    cursor: pointer;
    font-weight: 500;
    padding: .6rem;
    border-radius: 5px;
    margin-right: 10px;
    transition-duration: .3s;

    &:hover {
        background-color: #161617;
    }
`

export const CreateAccountLink = styled(Button)`
    padding: .6rem;
    margin: 0 5px;
    font-weight: 600;
`

export const SearchInput = styled(Input)`
    width: 25rem;
    height: 1.3rem;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const LogoBox = styled.div`
    padding: .6rem;
    border-radius: 5px;
    background-color: #000;
`

export const LogoTitle = styled.h3`
    margin: 0;
    color: #FFF;
    cursor: pointer;
    font-weight: 500;
`

export const CreatePost = styled(Button)`
    padding: .6rem;
    margin: 0 20px;
    font-weight: 600;

    @media screen and (max-width: 380px) {
        font-size: 12px;
    }
`

export const Logout = styled.img`
    width: 1.8rem;
    cursor: pointer;
    padding: .3rem;
    transition-duration: .3s;
    border-radius: 5px;

    &:hover {
        background-color: #F4F4F4;
    }
`

export const UserBox = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        margin-right: 2rem;
    }
`