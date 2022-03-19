import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

import { lengthChecker, likeIconChecker } from '../../utils'
import { LikeIcons } from '../../utils/icons'

import {
    AddCommentAction,
    DeleteCommentAction,
    LikeCommentAction
} from '../../redux/reducers/posts/actions'
import { CommentResponse } from '../../redux/redux-iterfaces/posts/posts'
import { useAppSelector } from '../../redux/hooks'

import {
    CommentsBox,
    CommentFiled,
    AddCommentButton,
    AddCommentBox,
    Comment,
    UserName,
    DateBox,
    CommentContent,
    CommentContainer,
    Likes,
    LikeIcon,
    DeleteComment,
    InteractionBox,
} from './styles'
import { BigUserImage } from '../PostContent/styles'

import AuthModal from './../additional/AuthModal/AuthModal'


interface CommentsProps {
    postId: number
    comments: CommentResponse[]
}

const Comments: React.FC<CommentsProps> = ({ postId, comments }) => {
    const [comment, setComment] = useState('')
    const [ isOpen, setIsOpen ] = useState(false)
    const userId = useAppSelector(state => state.account.user?.id)
    const dispatch = useDispatch()
    const history = useHistory()

    const addComment = () => {
        if (!userId) {
            setIsOpen(true)
        }
        userId && dispatch(AddCommentAction(
            { postId, content: comment }
        ))
        setComment('')
    }

    const deleteComment = (commentId: number) => {
        dispatch(DeleteCommentAction({ postId, commentId }))
    }

    const likeComment = (commentId: number) => {
        if (!userId) {
            setIsOpen(true)
        }
        if (userId) {
            dispatch(LikeCommentAction({ postId, commentId }))
        }
    }

    const userPage = (id: number) => history.push(`/user/${id}`)

    return (
        <CommentsBox>
            {
                isOpen && <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
            }
            <h2>Comments ({comments.length})</h2>
            <AddCommentBox>
                <CommentFiled
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Add new comment'
                />
                <AddCommentButton onClick={addComment}>Add</AddCommentButton>
            </AddCommentBox>
            {
                comments && comments.map((comment) => {
                    return (
                        <CommentContainer key={comment.id}>
                            {
                                comment.author.image
                                    ? <BigUserImage onClick={() => userPage(comment.author.id)} url={comment.author.image} />
                                    : <BigUserImage onClick={() => userPage(comment.author.id)} url=''>{comment.author.username[0]}</BigUserImage>
                            }
                            <Comment>
                                <UserName onClick={() => userPage(comment.author.id)}>
                                    {comment.author.username} | <DateBox>{
                                        new Date(comment.createdAt).toLocaleString(
                                            'en-US',
                                            {
                                                year: '2-digit',
                                                month: 'short',
                                                day: 'numeric'
                                            }
                                        )
                                    }</DateBox>
                                </UserName>
                                <CommentContent>{comment.content}</CommentContent>
                                <InteractionBox>
                                    <Likes onClick={() => likeComment(comment.id)}>
                                        <LikeIcon
                                            url={likeIconChecker(comment.likes, userId)}
                                            urlHover={LikeIcons.liked}
                                        />
                                        {lengthChecker(comment.likes.length, 'Like', 'Likes')}
                                    </Likes>
                                    {
                                        userId && comment.author.id === userId
                                            ? <DeleteComment
                                                onClick={() => deleteComment(comment.id)}
                                            />
                                            : null
                                    }
                                </InteractionBox>
                            </Comment>
                        </CommentContainer>
                    )
                })
            }
        </CommentsBox>
    )
}

export default Comments
