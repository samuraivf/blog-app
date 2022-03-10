import { takeEvery, call, put } from 'redux-saga/effects'

import { 
    CreatePostsSagaAction ,
    PostIdSagaAction,
    UpdatePostSagaAction,
} from "../../redux-iterfaces/posts/posts"

import { SetLoadingFalseAction } from '../../reducers/posts/actions'

import {
    CREATE_POST, 
    GET_POST,
    GET_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    DELETE_POST,
    LIKE_POST_SUCCESS,
    LIKE_POST,
    SAVE_POST,
    SAVE_POST_SUCCESS,
    UPDATE_POST,
} from '../../redux-iterfaces/posts/constants'

import { 
    createPost, 
    deletePost,
    getPost,
    likePost,
    savePost,
    updatePost,
} from './../../../api/posts/index'

function* createPostSaga(action: CreatePostsSagaAction) {
    try {
        yield call(createPost, action.payload)
    } catch (e) {
        return
    }
}

function* getPostSaga(action: PostIdSagaAction) {
    try {
        const { data } = yield call(getPost, action.payload)

        yield put({
            type: GET_POST_SUCCESS,
            payload: data
        })
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* deletePostSaga(action: PostIdSagaAction) {
    try {
        yield call(deletePost, action.payload)

        yield put({
            type: DELETE_POST_SUCCESS,
            payload: action.payload
        })
    } catch (e) {
        return
    }
}

function* likePostSaga(action: PostIdSagaAction) {
    try {
        const { data } = yield call(likePost, action.payload)

        yield put({
            type: LIKE_POST_SUCCESS,
            payload: data
        })
    } catch (e) {
        return
    }
}

function* savePostSaga(action: PostIdSagaAction) {
    try {
        const { data } = yield call(savePost, action.payload)

        yield put({
            type: SAVE_POST_SUCCESS,
            payload: data
        })
    } catch (e) {
        return
    }
}

function* updatePostSaga(action: UpdatePostSagaAction) {
    try {
        yield call(updatePost, action.payload)
    } catch (e) {
        return
    }
}

export default function* postsSaga() {
    yield takeEvery(CREATE_POST, createPostSaga)
    yield takeEvery(GET_POST, getPostSaga)
    yield takeEvery(DELETE_POST, deletePostSaga)
    yield takeEvery(LIKE_POST, likePostSaga)
    yield takeEvery(SAVE_POST, savePostSaga)
    yield takeEvery(UPDATE_POST, updatePostSaga)
}