import { all, spawn } from 'redux-saga/effects'

import accountSaga from './account'
import postsSaga from './posts'
import loadPostsSaga from './posts/loadPosts'
import tagsSaga from './tags'
import commentSaga from './posts/comments'

export default function* rootSaga() {
    const sagas = [accountSaga, postsSaga, tagsSaga, loadPostsSaga, commentSaga]

    yield all(sagas.map(s => spawn(s)))
}