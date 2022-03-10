import { AxiosResponse } from 'axios'

import API from '../index'

import { OverviewPost, SearchPostPayload } from '../../redux/redux-iterfaces/posts/posts'

export const loadLatestUserPosts = (from: number): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/posts/user-posts/latest/${from}`)
} 

export const loadOldestUserPosts = (from: number): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/posts/user-posts/oldest/${from}`)
} 

export const loadPopularUserPosts = (from: number): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/posts/user-posts/popular/${from}`)
} 

export const loadUserSavedPosts = (from: number): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/posts/user-posts/saved/${from}`)
} 

export const loadFollowedPosts = (from: number): Promise<AxiosResponse<OverviewPost[]>> => API.get(`/posts/followed-posts/${from}`)

export const loadLatestPosts = (from: number): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/posts/latest/${from}`)
} 

export const loadOldestPosts = (from: number): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/posts/oldest/${from}`)
}

export const loadPopularPosts = (from: number): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/posts/popular/${from}`)
}

export const findPost = (data: SearchPostPayload): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/posts/search/${data.query}/${data.from}`)
} 
