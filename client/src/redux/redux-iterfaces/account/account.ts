import { OverviewPost } from '../posts/posts'
import { Action } from './../index'

export interface AccountState {
    user: User | null
    users: UserShortInfo[]
    profile: Profile | null
    username: string
    fail: string
}

export interface AccountInfoData {
    email: string
    password: string
    username?: string
}

export interface Account {
    username: string
    id: number
    description: string
    location: string
    createdAt: string
    followers: number[]
    image?: string
}

export interface UserShortInfo {
    id: number
    username: string
    image?: string
}

export interface User extends Account {
    saved: number[]
    followed: number[]
}

export interface Profile extends Account {
    comments: number
    posts: OverviewPost[]
}

export interface UserInfo {
    username: string
    description: string
    location: string
    image?: string
}

export interface FindUserPayload {
    username: string
    from: number
}

export interface AccountSagaAction extends Action {
    payload: AccountInfoData
}

export interface AccountActionResponse extends Action {
    payload: AccountResponse | ProfileResponse
}

export interface AddInfoSagaAction extends Action {
    payload: UserInfo
}

export interface FindUserSagaAction extends Action {
    payload: FindUserPayload
}

export interface AccountResponse {
    user: User
    accessToken: string
}

export interface ProfileResponse {
    profile: Profile
}
