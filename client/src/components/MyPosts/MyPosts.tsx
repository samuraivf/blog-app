import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'

import {
    LoadLatestUserPostsAction,
    LoadOldestUserPostsAction,
    LoadPopularUserPostsAction,
    SetLoadingTrueAction
} from '../../redux/reducers/posts/actions'
import { useAppSelector } from '../../redux/hooks'

import { RootBox } from '../styled-components/RootBox'
import { Posts } from './../styled-components/Posts'
import { SortPostBox } from '../SortPost/styles'

import Post from '../Post/Post'
import SortPostLink from '../SortPost/SortPost'
import CheckLoading from './../additional/CheckLoading/CheckLoading'
import LoadMoreButton from '../additional/LoadMoreButton/LoadMoreButton'

const MyPosts: React.FC = () => {
    const dispatch = useDispatch()
    const { userPosts, loading } = useAppSelector(state => state.posts)
    const location = useLocation()

    useEffect(() => {
        dispatch(SetLoadingTrueAction())

        checkPathname(0)
    }, [location.pathname])

    const checkPathname = (from: number): void => {
        switch (location.pathname) {
            case '/my-posts':
                dispatch(LoadLatestUserPostsAction(from))
                break
            case '/my-posts/oldest':
                dispatch(LoadOldestUserPostsAction(from))
                break
            case '/my-posts/popular':
                dispatch(LoadPopularUserPostsAction(from))
                break
        }
    }

    return (
        <RootBox data-testid='my-posts-page' >
            <Posts>
                <SortPostBox>
                    <SortPostLink name='Latest' to='/my-posts' onClick={LoadLatestUserPostsAction} />
                    <SortPostLink name='Popular' to='/my-posts/popular' onClick={LoadPopularUserPostsAction} />
                    <SortPostLink name='Oldest' to='/my-posts/oldest' onClick={LoadOldestUserPostsAction} />
                </SortPostBox>

                <CheckLoading loading={loading} length={userPosts.length} />
                {
                    (loading === false && userPosts.length)
                        ? <>
                            {
                                userPosts.map((post) => {
                                    return (
                                        <Post
                                            post={post}
                                            key={post.id}
                                        />
                                    )
                                })
                            }
                            <LoadMoreButton checkPathname={checkPathname} from={userPosts.length} />
                        </>
                        : null
                }
            </Posts>
        </RootBox>
    )
}

export default MyPosts
