import React from 'react'
import { UserImage } from '../Post/styles'

import { UserBox, UserContainer, Username } from './styles'

type PropTypes = {
    username: string
    onClick: () => void
    image?: string
}

const User: React.FC<PropTypes> = ({ username, image, onClick }) => {
    return (
        <UserBox>
            <UserContainer>
                {
                    image
                        ? <UserImage onClick={onClick} url={image} />
                        : <UserImage onClick={onClick} url=''>{username[0]}</UserImage>
                }
                <Username onClick={onClick}>{username}</Username>
            </UserContainer>
        </UserBox>
    )
}

export default React.memo(User)
