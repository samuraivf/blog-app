import styled from 'styled-components'
import { Button } from './../../styled-components/Button'

export const Background = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100vh;
    top: 0;
`

export const ModalBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 25rem;
    height: 20rem;
`

export const CloseButton = styled(Button)`
    width: 8rem;
    height: 2rem;
    margin-right: 1rem;
    border: 1px solid #000;
    color: #000;
    background-color: #fff;

    &:hover {
        color: #fff;
        background-color: #000;
    }
`

export const CreateAccountButton = styled(Button)`
    width: 8rem;
    height: 2rem;
    margin-left: 1rem;
`