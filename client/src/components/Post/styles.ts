import styled from 'styled-components'
import { IImage, IUserBox, IIcon } from '../styled-components/component-interfaces'

import * as deleteIcon from '../../icons/bin.png'
import * as deleteIconHover from '../../icons/bin-hover.png'

export const PostBox = styled.div`
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 40.625rem;
    margin: .5rem 0;

    @media screen and (max-width: 1024px) {
        width: 95%;
    }

    @media screen and (max-width: 320px) {
        width: 90%;
    }
`

export const ImageBox = styled.div<IImage>`
    background-image: url(${props => props.url});
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #FFF;
    background-size: cover;
    width: 100%;
    height: 18rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

export const DescriptionBox = styled.div`
    min-height: 8rem;
    padding: 1.5rem;

    @media screen and (max-width: 480px) {
        padding: 1rem;
    }
`

export const UserBox = styled.div<IUserBox>`
    display: flex;
    align-items: center;
    justify-content: start;
    width: 85%;
    padding: ${props => props.padding || '0'};
`

export const UserName = styled.h4`
    margin: .25rem 0;
    cursor: pointer;
    transition-duration: .3s;

    &:hover {
        color: #3B49DF;
    }
`

export const UploadDate = styled.h5`
    margin: 0;
    color: #A0A0A0;
    font-weight: 400;
`

export const UserImage = styled.div<IImage>`
    background-image: url(${props => props.url});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #E2EEFF;
    margin-right: .5rem;
    cursor: pointer;
`

export const PostContent = styled.div<IUserBox>`
    padding: 0 0 0 2rem;
    width: 85%;

    @media screen and (max-width: 768px) {
        padding: ${props => props.padding || '0 0 0 2rem'};
    }
`

export const Title = styled.h2`
    margin: .5rem;
    font-size: 2rem;
    transition-duration: .3s;
    cursor: pointer;

    &:hover {
        color: #3B49DF;
    }

    @media screen and (max-width: 480px) {
        font-size: 1.8rem;
    }
`

export const TagsBox = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

export const Tag = styled.a`
    padding: .25rem .5rem;
    border-radius: 5px;
    border: 1px solid #FFF;
    transition-duration: .3s;
    cursor: pointer;
    margin-right: .25rem;
    color: #555555;
    text-decoration: none;

    &:hover {
        border: 1px solid #9EC6FF;
        background-color: #BFD7FA;
        color: #000;
    }
`

export const InteractionBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: .5rem;
    padding-left: 2rem;
`

export const ReviewBox = styled.div`
    display: flex;
    align-items: center;
    padding: .5rem;
    transition-duration: .3s;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #EEEEEE;
    }
`

export const Icon = styled.img`
    width: 1rem;
    margin-right: .5rem;
`

export const ReactionBox = styled.div`
    display: flex;
    align-items: center;
`

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 4.5rem;
    position: relative;
`

export const Save = styled.div<IIcon>`
    position: absolute;
    right: 0;
    width: 2rem;
    height: 2rem;
    background-image: url(${props => props.url});
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #FFF;
    background-size: cover;
    cursor: pointer;
    transition-duration: .3s;

    &:hover {
        background-image: url(${props => props.urlHover});
    }
`

export const DeleteButton = styled.button`
    cursor: pointer;
    background: url(${deleteIcon.default});
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #FFF;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 5px;
    transition-duration: .3s;

    &:hover {
        background-image: url(${deleteIconHover.default});
    }
`