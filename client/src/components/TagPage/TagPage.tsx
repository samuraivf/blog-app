import React, { useEffect } from 'react'
import { useHistory, useParams, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'

import {
    GetLatestPostsByTagAction,
    GetPopularPostsByTagAction,
    GetOldestPostsByTagAction
} from '../../redux/reducers/tags/actions'
import { SetLoadingTrueAction } from '../../redux/reducers/posts/actions'
import { SetTagAction } from './../../redux/reducers/tags/actions'
import { useAppSelector } from '../../redux/hooks'

import { RootBox } from '../styled-components/RootBox'
import { Posts } from './../styled-components/Posts'
import { SortPostBox } from '../SortPost/styles'

import Post from '../Post/Post'
import SortPostLink from '../SortPost/SortPost'
import CheckLoading from './../additional/CheckLoading/CheckLoading'
import LoadMoreButton from './../additional/LoadMoreButton/LoadMoreButton'

type ParamTypes = {
    tag?: string
}

const TagPage: React.FC = () => {
    const history = useHistory()
    const location = useLocation()
    const params = useParams<ParamTypes>()
    const dispatch = useDispatch()
    const { tag } = useAppSelector((state) => state.tags)
    const { posts, loading } = useAppSelector(state => state.posts)

    useEffect(() => {        
        dispatch(SetLoadingTrueAction())

        if (!tag && params.tag) {
            dispatch(SetTagAction(params.tag))
        }

        checkPathname(0)
    }, [tag, location])

    const checkPathname = (from: number) => {
        switch(location.pathname) {
            case `/tags/${tag}`:
                dispatch(GetLatestPostsByTagAction(
                    { arg: tag, from }
                ))
                break
            case `/tags/${tag}/oldest`:
                dispatch(GetOldestPostsByTagAction(
                    { arg: tag, from }
                ))
                break
            case `/tags/${tag}/popular`:
                dispatch(GetPopularPostsByTagAction(
                    { arg: tag, from }
                ))
                break
        }
    }

    const changeTag = (tagName: string): void => {
        history.push(`/tags/${tagName}`)
        dispatch(SetTagAction(tagName))
    }

    return (
        <RootBox>
            <Posts>
                <h2>Posts with #{tag} tag </h2>
                <SortPostBox>
                    <SortPostLink 
                        name='Latest' 
                        to={`/tags/${tag}`} 
                        />
                    <SortPostLink 
                        name='Popular' 
                        to={`/tags/${tag}/popular`} 
                    />
                    <SortPostLink 
                        name='Oldest' 
                        to={`/tags/${tag}/oldest`} 
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
                                        setTag={changeTag}
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

export default TagPage