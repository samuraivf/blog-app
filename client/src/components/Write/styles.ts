import styled from 'styled-components'
import { Button } from '../styled-components/Button'

export const WriteBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 1rem;

    @media screen and (max-width: 480px) {
        width: 100%;
    }
`

export const Editor = styled.div`
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const TitleInput = styled.input`
    border: none;
    width: 84%;
    height: 4rem;
    padding: 0 2rem;
    font-size: 2rem;
    font-family: 'Inconsolata', Arial, Helvetica, sans-serif;
    font-weight: 600;

    &:focus {
        outline: none;
    }

    @media screen and (max-width: 480px) {
        width: 80%;
    }
`

export const TagsInput = styled.input`
    border: none;
    width: 80%;
    height: 2rem;
    padding: 0 1rem;
    margin-right: 2rem;
    font-size: 1rem;
    font-family: 'Inconsolata', Arial, Helvetica, sans-serif;
    font-weight: 500;
    background-color: #F6F6F6;
    border-radius: 5px;
    overflow: scroll;

    &:focus {
        outline: none;
    }

    @media screen and (max-width: 480px) {
        margin: 0;
    }
`

export const TagsBox = styled.div`
    display: flex;
    align-items: center;
    padding: 0 2rem;

    @media screen and (max-width: 480px) {
        flex-direction: column;
    }
`

export const UploadBox =  styled.div`
    display: flex;

    @media screen and (max-width: 480px) {
        padding-top: 1rem;
    }
`

export const UploadLabel = styled.label`
    height: 2rem;
`

export const UploadInput = styled.input`
    opacity: 0;
    width: 0;
    position: absolute;
    z-index: -1;
`

export const UploadImage = styled.img`
    width: 2rem;
    cursor: pointer;
`

export const ImageName = styled.div`
    margin-left: .5rem;
    max-width: 7.5rem;
    padding: 0 .5rem;
    height: 2rem;
    background-color: #F6F6F6;
    border-radius: 5px;
    overflow: scroll;
    display: flex;
    align-items: center;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    p {
        white-space: nowrap;
    }
`

export const InputBox = styled.div`
    height: 6rem;
    background-color: #FFF;
    padding-bottom: 1rem;

    @media screen and (max-width: 480px) {
        height: 9rem;
    }
`

export const Container = styled.div`
    width: 95%;
    border: 1px solid #ccc;
    margin-bottom: 4rem;
`

export const PublishBox = styled.div`
    position: fixed;
    bottom: 0;
    margin-top: 1rem;
    height: 3rem;
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #ccc;
    margin: auto;

    @media screen and (min-width: 1800px) {
        position: static;
        background-color: inherit;
    }
`

export const PublishButton = styled(Button)`
    font-weight: 400;
    width: 6rem;
    padding: .5rem 0;
    margin: 1rem;
`

export const BackButton = styled(PublishButton)`
    background-color: #FFF;
    color: #000;
    border: 1px solid #000;

    &:hover {
        background-color: #000;
        color: #FFF;
    }
`