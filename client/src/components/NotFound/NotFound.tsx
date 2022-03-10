import React from 'react'
import { useHistory } from 'react-router-dom'

import { NotFoundBox, HomeButton } from './styles'

interface PropTypes {
    message?: string
}

const NotFound: React.FC<PropTypes> = ({ message }) => {
    const history = useHistory()

    return (
        <NotFoundBox>
            <h1>{ message || 'Page' } is Not Found | 404</h1>
            <HomeButton onClick={() => history.push('/')} >Go Back</ HomeButton>
        </NotFoundBox>
    )
}

export default NotFound
