import styled from 'styled-components'
import { Icon, UserImage } from './../Post/styles'
import { Icon as IconDiv } from './../PostContent/styles'
import { Button } from '../styled-components/Button'
import { LoginInut, ErrorDesc } from '../Account/styles'

export const UserBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%
`

export const UserBackground = styled.div`
    background-color: #000;
    width: 100%;
    height: 8rem;
`

export const ProfileBox = styled.div`
    width: 62rem;
    min-height: 10.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -3.5rem;
    background-color: #FFF;
    border-radius: 5px;
    position: relative;
    border: 1px solid #ccc;
    padding: 2rem 0;

    @media screen and (max-width: 1024px) {
        width: 90%;
        padding: 5%;
        border: none;
        border-bottom: 1px solid #ccc;
    }
`

export const Form = styled.form`
    @media screen and (max-width: 1024px) {
        width: 100%;
        border: none;
    }
`

export const BigUserImage = styled(UserImage)`
    width: 7rem;
    height: 7rem;
    cursor: default;
    margin: -3.5rem 0 0 0;
    position: absolute;
    top: 0;
    border: 7px solid #000;
    font-size: 2rem;
    font-weight: 500;
`

export const UserName = styled.h1`
    margin-top: 4rem;
`

export const UserNameInput = styled(LoginInut)`
    width: 20rem;
    height: 1.5rem;
    margin-top: 4rem;
    margin-bottom: 0;
    font-size: 2em;
    font-weight: 700;
    text-align: center;
`

export const UserDescriptionInput = styled(LoginInut)`
    width: 25rem;
    height: 1.5rem;
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;

    @media screen and (max-width: 480px) {
        width: 20rem;
    }
`

export const UserLocationInput = styled(LoginInut)`
    font-weight: 400;
    width: 10rem;

    @media screen and (max-width: 480px) {
        width: 8rem;
    }
`

export const UserErrorDesc = styled(ErrorDesc)`
    height: 1.5rem;
`

export const UserDescription = styled.p`
    margin: 0 6rem 1rem;
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
    word-break: break-word;
`

export const UserInfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 20rem;

    @media screen and (max-width: 480px) {
        flex-direction: column;
        min-width: 90%;
        width: 90%;
    }
`

export const InfoBox = styled.div`
    display: flex;
    align-items: center;
`

export const InfoValue = styled.p`
    margin: 0;
`

export const SmallIcon = styled(Icon)`
    width: 1.5rem;
    height: 1.5rem;
`

export const EditIcon = styled(IconDiv)`
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 1rem;
    margin-right: 1rem;
`

export const ButtonsBox = styled.div`
    display: flex;
    align-items: center;
    width: 12rem;
    justify-content: center;
`

export const SaveButton = styled(Button)`
    width: 5rem;
    height: 2rem;
    font-weight: 400;
    margin-left: 1rem;
`

export const FollowButton = styled(SaveButton)`
    font-weight: 600;
    margin: 1rem 0 0 0;
`

export const UnfollowButton = styled(FollowButton)`
    border: 1px solid #000;
    color: #000;
    background-color: #fff;

    &:hover {
        color: #fff;
        background-color: #000;
    }
`

export const CancelButton = styled(Button)`
    width: 5rem;
    height: 2rem;
    font-weight: 400;
    background-color: #FFF;
    color: #000;
    border: 1px solid #000;
    margin-right: 1rem;

    &:hover {
        background-color: #000;
        color: #FFF;
    }
`

export const UploadLabel = styled.label`
    height: 4rem;
`

export const UploadImage = styled.img`
    width: 4rem;
    cursor: pointer;
`

export const UploadInput = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`

export const Information = styled.div`
    width: 62rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: .5rem;

    @media screen and (max-width: 1024px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
`

export const PostsBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const ShortInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #FFF;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 1rem 1rem 0 1rem;
    margin-top: .5rem;
    width: 18rem;

    @media screen and (max-width: 1024px) {
        width: 90%;
    }

    @media screen and (max-width: 768px) {
        width: 86%;
    }

    @media screen and (max-width: 480px) {
        width: 80%;
    }
`

export const ShortInfoLine = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`

export const ShortInfoText = styled.p`
    margin: 0;
`