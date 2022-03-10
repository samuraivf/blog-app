import { User } from "../account/account"
import { Tag } from '../tags/tags'
import { Action } from './../index'

export interface PostsState {
    posts: OverviewPost[]
    userPosts: OverviewPost[]
    savedPosts: OverviewPost[]
    searchPosts: OverviewPost[]
    followedPosts: OverviewPost[]
    currentPost: PostData | null
    loading: boolean | null
}

export interface CreatePostsSagaAction extends Action {
    payload: Post
}

export interface PostIdSagaAction extends Action {
    payload: number
}

export interface LoadPostsSagaAction extends Action {
    payload: number
}

export interface PostsAction extends Action {
    payload: PostData | OverviewPost[] | number
}

export interface AddCommentSagaAction extends Action {
    payload: Comment
}

export interface PostCommentSagaAction extends Action {
    payload: PostComment
}

export interface FindPostSagaAction extends Action {
    payload: SearchPostPayload
}

export interface UpdatePostSagaAction extends Action {
    payload: UpdatePost
}

export interface Post {
    title: string
    content: string
    author: number
    tags: string[]
    image?: string
}

export interface SearchPostPayload {
    query: string
    from: number
}

export interface UpdatePost extends Post {
    id: number
}

export interface OverviewPost {
    author: User
    createdAt: Date
    id: number
    title: string
    updatedAt: Date
    tags: Tag[]
    likes: number[]
    comments: CommentResponse[]
}

export interface PostData extends OverviewPost {
    content: string
    image?: string
}

export interface Comment {
    content: string
    postId: number
}

export interface CommentResponse {
    id: number
    content: string
    createdAt: Date
    likes: number[]
    author: User
}

export interface PostComment {
    postId: number
    commentId: number
}
