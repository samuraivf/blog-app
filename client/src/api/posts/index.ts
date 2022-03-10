import { AxiosResponse } from 'axios'

import API from '../index'

import { User } from '../../redux/redux-iterfaces/account/account'
import { Post, PostData, UpdatePost } from '../../redux/redux-iterfaces/posts/posts'

export const createPost = (data: Post): Promise<AxiosResponse<boolean>> => API.post('/posts/create', data)

export const getPost = (id: number): Promise<AxiosResponse<PostData>> => API.get(`/posts/${id}`)

export const deletePost = (id: number): Promise<AxiosResponse<void>> => API.delete(`/posts/${id}`)

export const likePost = (id: number): Promise<AxiosResponse<boolean>> => API.get(`/posts/${id}/like`)

export const savePost = (id: number): Promise<AxiosResponse<User>> => API.get(`/posts/save/${id}`)

export const updatePost = (data: UpdatePost): Promise<AxiosResponse<boolean>> => API.put('/posts/update', data)
