import styled from 'styled-components'

export const Posts = styled.div`
    margin-left: 18rem;
    width: 40.625rem;

    @media screen and (max-width: 768px) {
        margin-left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`
