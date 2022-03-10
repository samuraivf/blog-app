import styled from 'styled-components'

export const UserBox = styled.div`
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 1rem;
    width: 100%;
    margin: .5rem 0;

    @media screen and (max-width: 1439px) {
        width: 85%;
    }
`
export const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 85%;
`

export const Username = styled.h3`
    transition-duration: .3s;
    cursor: pointer;

    &:hover {
        color: #3B49DF;
    }
`