import styled from 'styled-components'
import { IBox, ITitle, IInput } from '../styled-components/component-interfaces'
import { Input } from '../styled-components/Input'

export const LoginBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
` 

export const Box = styled.div<IBox>`
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    border: ${props => props.border};
    border-radius: ${props => props.borderRadius};
    width: ${props => props.width};

    @media screen and (max-width: 480px) {
        width: 90%;
        padding: 5%;
    }
`

export const Title = styled.h2<ITitle>`
    text-align: center;
    margin-top: ${props => props.marginTop};
    font-size: ${props => props.size};
`

export const LoginInut = styled(Input)<IInput>`
    width: 25rem;
    height: 1rem;
    border: ${ props => props.error ? '2px solid #F64141' : '2px solid #EBEBEB' };

    @media screen and (max-width: 480px) {
        width: 90%;
    }
`

export const ErrorDesc = styled.p`
    height: 1rem;
    color: #F64141;
    margin: 0;
    font-weight: 400;
    padding: .25rem;
`

export const InputDesc = styled.h4`
    margin-top: .5rem;
    margin-bottom: .5rem;
    font-weight: 400;
`

export const SubmitButton = styled.button`
    margin: 2rem 0 0 0;
    width: 25.5rem;
    height: 2.5rem;
    border-radius: 5px;
    border: none;
    background-color: #1467A7;
    color: #FFF;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.1rem;
    transition-duration: .3s;

    &:hover {
        background-color: #0A5792;
    }

    @media screen and (max-width: 480px) {
        width: 80%;
    }
`

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`

export const InputBox = styled.div`
    width: 90%;
    padding: 0 5%;
`

export const Change = styled.button`
    font-weight: 400;
    font-size: 1rem;
    color: #1467A7;
    background-color: #FFF;
    border: none;
    padding: 0;
    cursor: pointer;
    transition-duration: .3s;

    &:hover {
        color: #0A5792;
    }
`