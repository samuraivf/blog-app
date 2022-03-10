import styled from 'styled-components'

export const Title = styled.h1`
    text-align: center;
    margin-top: 0;
    font-weight: 900;
`

export const MainContainer = styled.div`
    width: 100%;
    padding: 1rem;
`

export const TagsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    width: 100%;
    align-items: center;

    @media screen and (max-width: 659px) {
        grid-template-columns: 1fr;
    }

    @media screen and (min-width: 651px) and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }
`

export const TagBox = styled.div`
    border-radius: 5px;
    border: 1px solid #CCC;
    border-top: 16px solid #3B49DF;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    width: 88%;
    height: 6rem;
    justify-self: center;
    background-color: #FFF;
`

export const TagName = styled.span`
    font-size: 1.5rem;
    margin: .2rem 0;
    cursor: pointer;
    transition-duration: .3s;
    font-weight: 600;

    &:hover {
        color: #3B49DF;
    }
`
