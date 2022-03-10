import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10rem;
`

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const Loader = styled.div`
    display: inline-block;
    width: 80px;
    height: 80px;
    
    &:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #3B49DF;
        border-color: #3B49DF transparent #3B49DF transparent;
        animation: ${rotate} 1.2s linear infinite;
    }
`