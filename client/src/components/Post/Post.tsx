import React from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

import { commentsChecker, likeChecker } from '../../utils/'
import { LikeIcons, SaveIcons } from '../../utils/icons'
import { saveIconChecker } from './../../utils/index'

import { useAppSelector } from '../../redux/hooks'
import { DeletePostAction, SavePostAction } from './../../redux/reducers/posts/actions'
import { OverviewPost } from './../../redux/redux-iterfaces/posts/posts'
import { SetTagAction } from './../../redux/reducers/tags/actions'

import {
    DescriptionBox,
    PostBox,
    Title,
    UserBox,
    TagsBox,
    InteractionBox,
    ReviewBox,
    Save,
    UserName,
    UserImage,
    UploadDate,
    PostContent,
    Tag,
    Icon,
    ReactionBox,
    DeleteButton,
    Buttons
} from './styles'

export interface PostProps {
    post: OverviewPost,
    setTag?: (tagName: string) => void
}

const Post: React.FC<PostProps> = ({ post, setTag }) => {
    const history = useHistory()
    const { user } = useAppSelector(state => state.account)
    const dispatch = useDispatch()

    const readPost = () => history.push(`/posts/${post.id}`)

    const userPage = () => history.push(`/user/${post.author.id}`)

    const tagPage = (tagName: string): void => {
        if (setTag) {
            setTag(tagName)
            return
        }
        dispatch(SetTagAction(tagName))

        history.push(`/tags/${tagName}`)
    }

    return (
        <PostBox>
            <DescriptionBox>
                <UserBox>
                    {
                        post.author.image
                            ? <UserImage onClick={userPage} url={post.author.image} />
                            : <UserImage onClick={userPage} url=''>{post.author.username[0]}</UserImage>
                    }
                    <div>
                        <UserName onClick={userPage}>{post.author.username}</UserName>
                        <UploadDate>
                            {
                                new Date(post.createdAt).toLocaleString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }
                                )
                            }
                        </UploadDate>
                    </div>
                </UserBox>
                <PostContent>
                    <Title onClick={readPost}>{post.title}</Title>
                    <TagsBox>
                        {
                            post.tags && post.tags
                                .slice(0, 4)
                                .map(
                                    tag => <Tag
                                        onClick={() => tagPage(tag.name)} key={tag.id}
                                    >
                                        #{tag.name}
                                    </Tag>
                                )
                        }
                    </TagsBox>
                </PostContent>
                <InteractionBox>
                    <ReactionBox>
                        <ReviewBox onClick={readPost}>
                            <Icon src={LikeIcons.notLiked} />
                            {likeChecker(post.likes.length)}
                        </ReviewBox>
                        <ReviewBox onClick={readPost}>
                            <Icon src='https://cdn-icons.flaticon.com/png/512/3031/premium/3031126.png?token=exp=1641739757~hmac=2b7c33b43a7f58edb16d3f5cbb1fb2c3' />
                            {commentsChecker(post.comments.length)}
                        </ReviewBox>
                    </ReactionBox>
                    {
                        user && (
                            <Buttons>
                                {+user?.id === post.author.id && (
                                    <DeleteButton
                                        onClick={() => dispatch(DeletePostAction(post.id))}
                                    />
                                )}
                                <Save
                                    url={saveIconChecker(user?.saved, post.id)}
                                    urlHover={SaveIcons.saved}
                                    onClick={() => dispatch(SavePostAction(post.id))}
                                />
                            </Buttons>
                        )
                    }
                </InteractionBox>
            </DescriptionBox>
        </PostBox>
    )
}

export default Post