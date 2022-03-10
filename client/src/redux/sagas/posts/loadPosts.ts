import { takeEvery, call, put } from 'redux-saga/effects'

import { FindPostSagaAction, LoadPostsSagaAction } from '../../redux-iterfaces/posts/posts'
import { 
    LOAD_LATEST_USER_POSTS,
    LOAD_OLDEST_USER_POSTS,
    LOAD_LATEST_POSTS,
    LOAD_OLDEST_POSTS,
    LOAD_POPULAR_POSTS,
    LOAD_POPULAR_USER_POSTS,
    LOAD_SAVED_USER_POSTS,
    LOAD_SAVED_USER_POSTS_SUCCESS,
    LOAD_FINDED_POSTS_SUCCESS,
    LOAD_FOLLOWED_POSTS,
    LOAD_FOLLOWED_POSTS_SUCCESS,
    FIND_POST,
} from "../../redux-iterfaces/posts/constants"

import { Action } from './../../redux-iterfaces/index'

import { 
    loadLatestUserPosts, 
    loadOldestUserPosts,
    loadLatestPosts,
    loadOldestPosts,
    loadPopularPosts,
    loadPopularUserPosts,
    loadUserSavedPosts,
    loadFollowedPosts,
    findPost,
} from './../../../api/posts/loadPosts'

import { SetLoadingFalseAction } from '../../reducers/posts/actions'

import { 
    checkPostsLoad, 
    checkUserPostsLoad,
    checkSavedPostsLoad,
    checkFindedPostsLoad,
    checkFollowedPostsLoad,
} from './checkers'

function* loadLatestUserPostsSaga(action: LoadPostsSagaAction) {
    try {
        const { data } = yield call(loadLatestUserPosts, action.payload)

        yield checkUserPostsLoad(action.payload, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* loadOldestUserPostsSaga(action: LoadPostsSagaAction) {
    try {
        const { data } = yield call(loadOldestUserPosts, action.payload)

        yield checkUserPostsLoad(action.payload, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* loadPopularUserPostsSaga(action: LoadPostsSagaAction) {
    try {
        const { data } = yield call(loadPopularUserPosts, action.payload)

        yield checkUserPostsLoad(action.payload, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* loadLatestPostsSaga(action: LoadPostsSagaAction) {
    try {
        const { data } = yield call(loadLatestPosts, action.payload)

        yield checkPostsLoad(action.payload, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* loadOldestPostsSaga(action: LoadPostsSagaAction) {
    try {
        const { data } = yield call(loadOldestPosts, action.payload)

        yield checkPostsLoad(action.payload, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* loadPopulartPostsSaga(action: LoadPostsSagaAction) {
    try {
        const { data } = yield call(loadPopularPosts, action.payload)

        yield checkPostsLoad(action.payload, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* loadUserSavedPostsSaga(action: LoadPostsSagaAction) {
    try {
        const { data } = yield call(loadUserSavedPosts, action.payload)

        yield checkSavedPostsLoad(action.payload, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* loadFollowedPostsSaga(action: LoadPostsSagaAction) {
    try {
        const { data } = yield call(loadFollowedPosts, action.payload)

        yield checkFollowedPostsLoad(action.payload, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* findPostSaga(action: FindPostSagaAction) {
    try {
        const { data } = yield call(findPost, action.payload)

        yield checkFindedPostsLoad(action.payload.from, data)
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

export default function* loadPostsSaga() {
    yield takeEvery(LOAD_LATEST_USER_POSTS, loadLatestUserPostsSaga)
    yield takeEvery(LOAD_OLDEST_USER_POSTS, loadOldestUserPostsSaga)
    yield takeEvery(LOAD_POPULAR_USER_POSTS, loadPopularUserPostsSaga)
    yield takeEvery(LOAD_LATEST_POSTS, loadLatestPostsSaga)
    yield takeEvery(LOAD_OLDEST_POSTS, loadOldestPostsSaga)
    yield takeEvery(LOAD_POPULAR_POSTS, loadPopulartPostsSaga)
    yield takeEvery(LOAD_SAVED_USER_POSTS, loadUserSavedPostsSaga)
    yield takeEvery(LOAD_FOLLOWED_POSTS, loadFollowedPostsSaga)
    yield takeEvery(FIND_POST, findPostSaga)
}