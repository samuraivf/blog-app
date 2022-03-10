import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../redux/hooks'
import { SetLoadingTrueAction } from './../../redux/reducers/posts/actions'
import { SetUsernameAction } from '../../redux/reducers/account/actions'
import { FindUserAction } from './../../redux/reducers/account/actions'

import { RootBox } from './../styled-components/RootBox'
import { Posts as UsersBox } from './../styled-components/Posts'
import { LoadButton, LoadMoreContainer } from '../additional/LoadMoreButton/styles'

import CheckLoading from './../additional/CheckLoading/CheckLoading'
import User from './User'

type ParamTypes = {
    username?: string
}

const Users: React.FC = () => {
    const history = useHistory()
    const params = useParams<ParamTypes>()
    const dispatch = useDispatch()
    const { users, username } = useAppSelector((state) => state.account)
    const { loading } = useAppSelector(state => state.posts)

    useEffect(() => {
        dispatch(SetLoadingTrueAction())

        if (!username && params.username) {
            dispatch(SetUsernameAction(params.username))
        }

        if (username) {
            dispatch(FindUserAction({ username, from: 0 }))
        }
    }, [username])

    const findUser = () => {
        dispatch(FindUserAction({ username, from: users.length }))
    }

    const userPage = (id: number) => {
        history.push(`/user/${id}`)
    }

    return (
        <RootBox>
            <UsersBox>
                <h2>Users with '{username}' username</h2>

                <CheckLoading loading={loading} length={users.length} />

                {
                    (loading === false && users.length)
                    ? <>
                        {
                            users.map((user) => {
                                return <User 
                                    key={user.id} 
                                    {...user}
                                    onClick={() => userPage(user.id)}
                                />
                            })
                        }
                        <LoadMoreContainer>
                            <LoadButton onClick={findUser}>LOAD MORE</LoadButton>
                        </LoadMoreContainer>
                    </>
                    : null
                }
            </UsersBox>
        </RootBox>
    )
}

export default Users
