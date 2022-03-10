import { put } from "redux-saga/effects"

import { 
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FROM_0_SUCCESS,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FROM_0_SUCCESS,
    LOAD_SAVED_USER_POSTS_SUCCESS,
    LOAD_SAVED_USER_POSTS_FROM_0_SUCCESS,
    LOAD_FINDED_POSTS_SUCCESS,
    LOAD_FINDED_POSTS_FROM_0_SUCCESS,
    LOAD_FOLLOWED_POSTS_SUCCESS,
    LOAD_FOLLOWED_POSTS_FROM_0_SUCCESS,
} from './../../redux-iterfaces/posts/constants'

export function* checkPostsLoad(from: number, data: any) {
    if (!from) {
        yield put({
            type: LOAD_POSTS_FROM_0_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: LOAD_POSTS_SUCCESS,
            payload: data
        })
    }
}

export function* checkUserPostsLoad(from: number, data: any) {
    if (!from) {
        yield put({
            type: LOAD_USER_POSTS_FROM_0_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            payload: data
        })
    }
}

export function* checkSavedPostsLoad(from: number, data: any) {
    if (!from) {
        yield put({
            type: LOAD_SAVED_USER_POSTS_FROM_0_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: LOAD_SAVED_USER_POSTS_SUCCESS,
            payload: data
        })
    }
}

export function* checkFindedPostsLoad(from: number, data: any) {
    if (!from) {
        yield put({
            type: LOAD_FINDED_POSTS_FROM_0_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: LOAD_FINDED_POSTS_SUCCESS,
            payload: data
        })
    }
}

export function* checkFollowedPostsLoad(from: number, data: any) {
    if (!from) {
        yield put({
            type: LOAD_FOLLOWED_POSTS_FROM_0_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: LOAD_FOLLOWED_POSTS_SUCCESS,
            payload: data
        })
    }
}
