import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'

import {
    DeletePostAction,
    GetPostAction,
    LikePostAction,
    SavePostAction,
    SetLoadingTrueAction
} from './../../redux/reducers/posts/actions'
import { useAppSelector } from '../../redux/hooks'

import { RootBox } from '../styled-components/RootBox'
import {
    ReactionBox,
    Icon,
    ReactionCount,
    ReactionContainer,
    UserBox,
    BigUserImage,
    User,
    UserName,
    LookButton,
    InfoBox,
    UserDescription,
    Key,
    Value,
    LikeBox,
    DeleteBtn
} from './styles'

import { EditIcons, LikeIcons, SaveIcons } from '../../utils/icons'
import { saveIconChecker } from './../../utils/index'
import { likeIconChecker } from '../../utils'

import ReadPost from '../Read/Read'
import NotFound from '../NotFound/NotFound'
import AuthModal from './../additional/AuthModal/AuthModal'
import LoadingPage from '../additional/LoadingPage/LoadingPage'

type ParamTypes = {
    postid?: string
}

const PostContent: React.FC = () => {
    const [ isOpen, setIsOpen ] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const { currentPost, loading } = useAppSelector(state => state.posts)
    const { user } = useAppSelector(state => state.account)
    const params = useParams<ParamTypes>()

    useEffect(() => {
        dispatch(SetLoadingTrueAction())

        if (params.postid) {
            dispatch(GetPostAction(+params.postid))
        }
    }, [])

    if (loading) {
        return <LoadingPage />
    }

    if (!currentPost) {
        return null
    }

    const likePost = () => {
        if (!user?.id) {
            setIsOpen(true)
            return
        }
        dispatch(LikePostAction(currentPost.id))
    }
    
    const savePost = () => {
        if (!user?.id) {
            setIsOpen(true)
            return
        }
        dispatch(SavePostAction(currentPost.id))
    }

    const userPage = () => history.push(`/user/${currentPost.author.id}`)

    const deletePost = () => {
        dispatch(DeletePostAction(currentPost.id))

        history.push('/')
    }

    if (currentPost) return (
        <RootBox flexDirectionMedia='column'>
            {
                isOpen && <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
            }
            <ReactionBox>
                <ReactionContainer>
                    <LikeBox>
                        <Icon
                            url={likeIconChecker(currentPost.likes, user?.id)}
                            urlHover={LikeIcons.liked}
                            onClick={likePost}
                        />
                        <ReactionCount>{currentPost.likes.length}</ReactionCount>
                    </LikeBox>
                    <Icon
                        url={saveIconChecker(user?.saved, currentPost.id)}
                        urlHover={SaveIcons.saved}
                        onClick={savePost}
                        marginBottom='1.5rem'
                    />
                    {user && user.id === currentPost.author.id && (
                        <>
                            <Icon
                                url={EditIcons.default}
                                urlHover={EditIcons.hover}
                                onClick={() => history.push(`/posts/edit/${currentPost.id}`)}
                                marginBottom='1.5rem'
                            />
                            <DeleteBtn onClick={deletePost} />
                        </>
                    )}
                </ReactionContainer>
            </ReactionBox>
            {currentPost && (
                <>
                    <ReadPost
                        post={currentPost}
                    />
                    <UserBox>
                        <User>
                            {currentPost.author.image
                                ? <BigUserImage onClick={userPage} url={currentPost.author.image} />
                                : <BigUserImage onClick={userPage} url=''>
                                    {currentPost.author.username[0]}
                                </BigUserImage>
                            }
                            <UserName onClick={userPage}>{currentPost.author.username}</UserName>
                        </User>
                        <InfoBox>
                            <LookButton 
                                onClick={() => history.push(`/user/${currentPost.author.id}`)}
                            >
                                LOOK
                            </LookButton>                       
                            {
                                currentPost.author.description && (
                                    <UserDescription>{currentPost.author.description}</UserDescription>
                                )
                            }
                            <Key>LOCATION</Key>
                            <Value>{currentPost.author.location || 'No Data'}</Value>
                            <Key>JOINED</Key>
                            <Value>Joined on {
                                    new Date(currentPost.author.createdAt).toLocaleString(
                                        'en-US', 
                                        { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        }
                                    )
                                }
                            </Value>
                        </InfoBox>
                    </UserBox>
                </>
            )}
        </RootBox>
    )

    return <NotFound message='Post' />
}

export default PostContent