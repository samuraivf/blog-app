import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styled from 'styled-components'

import { SetUsernameAction } from '../../../redux/reducers/account/actions'

import {
    FindTagBox,
    FindTagInput as FindUserInput
} from '../FindTag/styles'

const FindUserBox = styled(FindTagBox)`
    top: 11rem;
`

const FindUser: React.FC = () => {
    const [username, setUsername] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    const findUser = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && username) {
            history.push(`/users/${username}`)
            dispatch(SetUsernameAction(username))
            setUsername('')
        }
    }

    return (
        <FindUserBox>
            <h2>Find a User</h2>
            <FindUserInput 
                placeholder='Search...' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => findUser(e)}
            />
        </FindUserBox>
    )
}

export default FindUser
