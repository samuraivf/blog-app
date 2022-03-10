import { AxiosResponse } from 'axios'

import API from '../index'

import { 
    PostComment, 
    Comment, 
    PostData 
} from './../../redux/redux-iterfaces/posts/posts'

export const addComment = (data: Comment): Promise<AxiosResponse<PostData>> => API.post('/posts/comment/', data)

export const deleteComment = (data: PostComment): Promise<AxiosResponse<PostData>> => API.delete(`/posts/${data.postId}/comment/${data.commentId}`)

export const likeComment = (data: PostComment): Promise<AxiosResponse<PostData>> => API.get(`/posts/${data.postId}/comment/like/${data.commentId}`)