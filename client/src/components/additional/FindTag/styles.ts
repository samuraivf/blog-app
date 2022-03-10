import styled from 'styled-components'

import { Input } from './../../styled-components/Input'
import { ISearchDiv } from './../../styled-components/component-interfaces'

export const FindTagBox = styled.div<ISearchDiv>`
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 2rem;
    top: 3.5rem;

    @media screen and (max-width: 1350px) {
        position: static;
    }

    @media screen and (min-width: 1550px) and (max-width: 1800px) {
        right: 15%;
    }

    @media screen and (min-width: 2380px) {
        right: 20%;
    }

    @media screen and (min-width: 2000px) and (max-width: 2379px) {
        right: 10%;
    }
`

export const FindTagInput = styled(Input)`
    width: 20rem;
    height: 2rem;
    font-size: 1.2em;

    @media screen and (max-width: 1350px) {
        width: 80%;
    }
`