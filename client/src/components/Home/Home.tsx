import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../../redux/hooks'
import {
    LoadLatestPostsAction,
    LoadOldestPostsAction,
    LoadPopularPostsAction,
    SetLoadingTrueAction,
} from '../../redux/reducers/posts/actions'

import { RootBox } from '../styled-components/RootBox'
import { Posts } from './../styled-components/Posts'
import { SortPostBox } from '../SortPost/styles'

import SortPostLink from '../SortPost/SortPost'
import Post from '../Post/Post'
import CheckLoading from '../additional/CheckLoading/CheckLoading'
import LoadMoreButton from '../additional/LoadMoreButton/LoadMoreButton'

const Home: React.FC = () => {
    const dispatch = useDispatch()
    const { posts, loading } = useAppSelector(state => state.posts)
    const location = useLocation()

    useEffect(() => {
        dispatch(SetLoadingTrueAction())

        checkPathname(0)
    }, [location.pathname])

    const checkPathname = (from: number): void => {
        switch (location.pathname) {
            case '/':
                dispatch(LoadLatestPostsAction(from))
                break
            case '/oldest':
                dispatch(LoadOldestPostsAction(from))
                break
            case '/popular':
                dispatch(LoadPopularPostsAction(from))
                break
        }
    }

    return (
        <RootBox data-testid='home-page'>
            <Posts>
                <SortPostBox>
                    <SortPostLink
                        name='Latest'
                        to='/'
                        onClick={LoadLatestPostsAction}
                    />
                    <SortPostLink
                        name='Popular'
                        to='/popular'
                        onClick={LoadPopularPostsAction}
                    />
                    <SortPostLink
                        name='Oldest'
                        to='/oldest'
                        onClick={LoadOldestPostsAction}
                    />
                </SortPostBox>

                <CheckLoading loading={loading} length={posts.length} />
                {
                    (loading === false && posts.length)
                        ? <>
                            {
                                posts.map((post) => {
                                    return (
                                        <Post
                                            post={post}
                                            key={post.id}
                                        />
                                    )
                                })
                            }
                            <LoadMoreButton checkPathname={checkPathname} from={posts.length} />
                        </>
                        : null
                }
            </Posts>
        </RootBox>
    )
}

export default Home