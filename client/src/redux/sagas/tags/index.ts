import { call, put, takeEvery } from 'redux-saga/effects'

import { 
    getLatestPostsByTag, 
    getOldestPostsByTag, 
    getPopularPostsByTag,
    loadTags 
} from './../../../api/tags/index'

import { SetLoadingFalseAction } from '../../reducers/posts/actions'

import { SagaAction } from '../../redux-iterfaces/tags/tags'
import { 
    GET_TAGS_SUCCESS, 
    GET_TAGS,  
    GET_POSTS_BY_TAG_SUCCESS,
    GET_LATEST_POSTS_BY_TAG,
    GET_OLDEST_POSTS_BY_TAG,
    GET_POPULAR_POSTS_BY_TAG,
    GET_POSTS_BY_TAG_FROM_0_SUCCESS
} from './../../redux-iterfaces/tags/constants'

export function* checkPosts(from: number, data: any) {
    if (!from) {
        yield put({
            type: GET_POSTS_BY_TAG_FROM_0_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: GET_POSTS_BY_TAG_SUCCESS,
            payload: data
        })
    }
}

export function* getTagsSaga() {
    try {
        const { data } = yield call(loadTags)

        yield put({
            type: GET_TAGS_SUCCESS,
            payload: data
        })
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

export function* getLatestPostsByTagSaga(action: SagaAction) {
    try {
        const { data } = yield call(getLatestPostsByTag, action.payload)

        yield checkPosts(action.payload.from, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

export function* getOldestPostsByTagSaga(action: SagaAction) {
    try {
        const { data } = yield call(getOldestPostsByTag, action.payload)

        yield checkPosts(action.payload.from, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

export function* getPopularPostsByTagSaga(action: SagaAction) {
    try {
        const { data } = yield call(getPopularPostsByTag, action.payload)

        yield checkPosts(action.payload.from, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

export default function* tagsSaga() {
    yield takeEvery(GET_TAGS, getTagsSaga)
    yield takeEvery(GET_LATEST_POSTS_BY_TAG, getLatestPostsByTagSaga)
    yield takeEvery(GET_POPULAR_POSTS_BY_TAG, getPopularPostsByTagSaga)
    yield takeEvery(GET_OLDEST_POSTS_BY_TAG, getOldestPostsByTagSaga)
}