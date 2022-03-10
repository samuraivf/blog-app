import { takeEvery, call, put } from 'redux-saga/effects'

import { AddCommentSagaAction, PostCommentSagaAction } from '../../redux-iterfaces/posts/posts'
import { 
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT,
    DELETE_COMMENT_SUCCES,
    DELETE_COMMENT,
    LIKE_COMMENT,
    LIKE_COMMENT_SUCCESS,
} from '../../redux-iterfaces/posts/constants'

import { addComment, deleteComment, likeComment } from '../../../api/posts/comments'

function* addCommentSaga(action: AddCommentSagaAction) {
    try {
        const { data } = yield call(addComment, action.payload)

        yield put({
            type: ADD_COMMENT_SUCCESS,
            payload: data
        })
    } catch (e) {
        return
    }
}

function* deleteCommentSaga(action: PostCommentSagaAction) {
    try {
        const { data } = yield call(deleteComment, action.payload)

        yield put({
            type: DELETE_COMMENT_SUCCES,
            payload: data
        })
    } catch (e) {
        return
    }
}

function* likeCommentSaga(action: PostCommentSagaAction) {
    try {
        const { data } = yield call(likeComment, action.payload)

        yield put({
            type: LIKE_COMMENT_SUCCESS,
            payload: data
        })
    } catch (e) {
        return
    }
}

export default function* commentSaga() {
    yield takeEvery(ADD_COMMENT, addCommentSaga)
    yield takeEvery(DELETE_COMMENT, deleteCommentSaga)
    yield takeEvery(LIKE_COMMENT, likeCommentSaga)
}