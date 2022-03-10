import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { FindPostAction, SetLoadingTrueAction } from './../../redux/reducers/posts/actions'
import { useAppSelector } from '../../redux/hooks'

import { RootBox } from './../styled-components/RootBox'
import { Posts } from './../styled-components/Posts'
import { LoadButton, LoadMoreContainer } from '../additional/LoadMoreButton/styles'

import Post from '../Post/Post'
import CheckLoading from '../additional/CheckLoading/CheckLoading'

type ParamTypes = {
    q?: string
}

const Search: React.FC = () => {
    const dispatch = useDispatch()
    const { searchPosts, loading } = useAppSelector(state => state.posts)
    const params = useParams<ParamTypes>()

    useEffect(() => {
        dispatch(SetLoadingTrueAction())

        if (params.q) {
            dispatch(FindPostAction({ query: params.q, from: 0 }))
        }
    }, [params])

    return (
        <RootBox>
            <Posts>
                <h1>Search results for '{params.q}'</h1>

                <CheckLoading loading={loading} length={searchPosts.length} />
                {
                    (loading === false && searchPosts.length)
                    ? <>
                        {
                            searchPosts.map((post) => {
                                return (
                                    <Post
                                        post={post}
                                        key={post.id}
                                    />
                                )
                            })
                        }
                        <LoadMoreContainer>
                            <LoadButton 
                                onClick={
                                    () => dispatch(
                                        FindPostAction({ query: params.q || '', from: searchPosts.length })
                                    )
                                } 
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

export default Search
