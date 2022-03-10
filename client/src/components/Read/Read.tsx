import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

import Quill from 'quill'

import { PostData } from './../../redux/redux-iterfaces/posts/posts'

import { SetTagAction } from './../../redux/reducers/tags/actions'

import {
    UserBox,
    UserImage,
    UserName,
    UploadDate,
    TagsBox,
    PostContent,
    Tag,
    Title,
    ImageBox,
    DescriptionBox
} from '../Post/styles'
import { PostContainer } from './styles'

import Comments from '../Comments/Comments'
import './styles.css'

interface ReadPostProps {
    post: PostData
}

export const ReadPost: React.FC<ReadPostProps> = ({ post }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const editor = new Quill('.content', {
            theme: 'bubble',
            readOnly: true,
        })

        if (post.content && editor.root) {
            editor.root.innerHTML = post.content
        }
    }, [])

    const userPage = () => history.push(`/user/${post.author.id}`)

    const tagPage = (name: string) => {
        dispatch(SetTagAction(name))
        history.push(`/tags/${name}`)
    }


    return (
        <PostContainer>
            {post.image && <ImageBox url={post.image} />}
            <DescriptionBox>
                <UserBox padding='0'>
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
                <PostContent padding='0'>
                    <Title>{post.title}</Title>
                    <TagsBox>
                        {
                            post.tags && post.tags
                                .slice(0, 4)
                                .map(
                                    tag => <Tag
                                        key={tag.id}
                                        onClick={() => tagPage(tag.name)}
                                    >
                                        #{tag.name}
                                    </Tag>
                                )
                        }
                    </TagsBox>
                </PostContent>
            </DescriptionBox>
            <div className='content'></div>
            <Comments postId={post.id} comments={post.comments} />
        </PostContainer>
    )
}

export default ReadPost