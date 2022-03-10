import React from 'react'
import { useHistory } from 'react-router-dom'

import { NotFoundBox as NotAuthorizedBox } from '../NotFound/styles'
import { CloseButton as HomeButton, CreateAccountButton } from '../additional/AuthModal/styles'

const NotAuthorized: React.FC = () => {
    const history = useHistory()

    return (
        <NotAuthorizedBox>
            <h2>You are not authorized :(</h2>
            <div>
                <HomeButton onClick={() => history.push('/')}>HOME</HomeButton>
                <CreateAccountButton onClick={() => history.push('/account')}>CREATE ACCOUNT</CreateAccountButton>
            </div>
        </NotAuthorizedBox>
    )
}

export default NotAuthorized
