import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../redux/hooks'
import { LoadSavedUserPostsAction, SetLoadingTrueAction } from '../../redux/reducers/posts/actions'

import { RootBox } from '../styled-components/RootBox'
import { Posts } from './../styled-components/Posts'
import { LoadMoreContainer, LoadButton } from '../additional/LoadMoreButton/styles'

import Post from '../Post/Post'
import CheckLoading from './../additional/CheckLoading/CheckLoading'
import NotAuthorized from '../NotAuthorized/NotAuthorized'

const Saved: React.FC = () => {
    const dispatch = useDispatch()
    const { user } = useAppSelector(state => state.account)
    const { savedPosts, loading } = useAppSelector(state => state.posts)

    const loadSavedPosts = (from: number) => {
        dispatch(LoadSavedUserPostsAction(from))
    }

    useEffect(() => {
        dispatch(SetLoadingTrueAction())
        loadSavedPosts(0)
    }, [])

    if (!user && !loading) {
        return <NotAuthorized />
    }

    return (
        <RootBox data-testid='saved-page'>
            <Posts>
                <h2>Saved Posts</h2>

                <CheckLoading loading={loading} length={savedPosts.length} />
                {
                    (loading === false && savedPosts.length)
                    ? <>
                        {
                            savedPosts.reverse().map((post) => (
                                <Post
                                    post={post}
                                    key={post.id}
                                />
                            ))
                        }
                        <LoadMoreContainer>
                            <LoadButton
                                onClick={() => loadSavedPosts(savedPosts.length)}
                            >
                                LOAD MORE
                            </LoadButton>
                        </LoadMoreContainer>
                    </>
                    : null
                }
            </Posts>
        </RootBox>
    )
}

export default Saved