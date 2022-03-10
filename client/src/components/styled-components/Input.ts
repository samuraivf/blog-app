import styled from 'styled-components'

export const Input = styled.input`
    border-radius: 5px;
    border: 2px solid #EBEBEB;
    padding: .5rem;
    transition-duration: .3s;
    font-family: 'Inconsolata', monospace, Arial, Helvetica, sans-serif;

    &:focus {
        outline: none;
        border: 2px solid #3B49DF;
    }
`