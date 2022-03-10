import styled from 'styled-components'
import { IIcon } from '../styled-components/component-interfaces'
import { UserImage } from '../Post/styles'
import { Button } from '../styled-components/Button'

export const ReactionBox = styled.aside`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 3rem 2rem 1rem 4rem;
    position: fixed;

    @media screen and (max-width: 768px) {
        bottom: 0;
        padding: 0;
        background-color: #FFF;
        border-top: 1px solid #ccc;
        width: 100%;
        height: 5rem;
        justify-content: space-around;
        z-index: 1;
    }
`

export const Icon = styled.div<IIcon & { marginBottom?: string }>`
    width: 2rem;
    height: 2rem;
    background-image: url(${props => props.url});
    background-position: center center;
    background-repeat: no-repeat;
    background-color: ##F0F2F3;
    background-size: cover;
    cursor: pointer;
    margin-bottom: ${props => props.marginBottom};

    &:hover {
        background-image: url(${props => props.urlHover});
    }

    @media screen and (max-width: 768px) {
        margin-bottom: 0;
    }
`

export const LikeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 480px) {
        width: 3rem;
        justify-content: space-between;
        flex-direction: row;
    }
`

export const ReactionCount = styled.h4`
    margin-top: .5rem;
    margin-bottom: 1.5rem;
    font-weight: 400;

    @media screen and (max-width: 768px) {
        margin: 0;
    }
`

export const ReactionContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media screen and (max-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
        width: 100%
    }
`

export const UserBox = styled.aside`
    background-color: #FFF;
    width: 21.6rem;
    min-height: 10rem;
    border: 1px solid #CCC;
    border-top: 32px solid #000;
    border-radius: 10px;
    margin: 1rem;
    position: fixed;
    right: 2.3rem;

    @media screen and (max-width: 768px) {
        position: static;
        width: 100%;
        margin: 1rem 0 5rem 0;
        border-left: none;
        border-right: none;
    }

    @media screen and (min-width: 769px) and (max-width: 1350px) {
        display: none;
    }
`

export const BigUserImage = styled(UserImage)`
    width: 3rem;
    height: 3rem;
    margin-left: 1rem;
    border: 1px solid #CCC;
`

export const User = styled.div`
    display: flex;
    align-items: center;
    margin-top: -1rem;
`

export const UserName = styled.h3`
    margin: 0;
    margin-top: 1.2rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition-duration: .3s;

    &:hover {
        color: #3B49DF;
    }
`

export const LookButton = styled(Button)`
    height: 2.5rem;
    width: 19.5rem;

    @media screen and (max-width: 768px) {
        width 100%;
    }
`

export const InfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding-top: 1.5rem;
    padding: 1.5rem 1rem 1rem;

    @media screen and (max-width: 768px) {
        align-items: flex-start;
    }
`

export const UserDescription = styled.p`
    color: #575757;
    line-height: 1.3;
    width: 19rem;
    word-break: break-word;
`

export const Key = styled.h4`
    font-size: .8rem;
    font-weight: 700;
    color: #717171;
    text-transform: uppercase;
    margin: .5rem 0;
    width: 100%
`

export const Value = styled.h5`
    color: #242424;
    font-size: .8rem;
    font-weight: 600;
    margin: 0;
    width: 100%
`