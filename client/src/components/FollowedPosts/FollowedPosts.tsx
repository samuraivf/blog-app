import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { LoadFollowedPostsAction, SetLoadingTrueAction } from '../../redux/reducers/posts/actions'
import { useAppSelector } from '../../redux/hooks'

import { RootBox } from '../styled-components/RootBox'
import { Posts } from './../styled-components/Posts'

import Post from '../Post/Post'
import CheckLoading from './../additional/CheckLoading/CheckLoading'
import LoadMoreButton from '../additional/LoadMoreButton/LoadMoreButton'

const FollowedPosts: React.FC = () => {
    const dispatch = useDispatch()
    const { followedPosts, loading } = useAppSelector(state => state.posts)
    const { user } = useAppSelector(state => state.account)

    useEffect(() => {
        if (user) {
            dispatch(SetLoadingTrueAction())
            dispatch(LoadFollowedPostsAction(0))
        }
    }, [user])

    return (
        <RootBox>
            <Posts>
                <h2>Followed Posts</h2>

                <CheckLoading loading={loading} length={followedPosts.length} />
                {
                    (loading === false && followedPosts.length) 
                        ? <>
                            {
                                followedPosts.map(post => {
                                    return (
                                        <Post
                                            post={post}
                                            key={post.id}
                                        />
                                    )
                                })
                            }
                            <LoadMoreButton load={LoadFollowedPostsAction} from={followedPosts.length} />
                        </> 
                        : null
                }
            </Posts>
        </RootBox>
    )
}

export default FollowedPosts
