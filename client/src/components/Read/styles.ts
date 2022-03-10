import styled from 'styled-components'

export const PostContainer = styled.main`
    background-color: #FFF;
    border-radius: 10px;
    border: 1px solid #CCC;
    margin: 1rem 0;
    margin-left: 7.7rem;
    width: 50.5rem;

    @media screen and (max-width: 768px) {
        margin: 0;
        width: 100%;
        border: none;
        border-bottom: 1px solid #CCC;
    }

    @media screen and (min-width: 769px) and (max-width: 1350px) {
        width: 85%;
    }
`