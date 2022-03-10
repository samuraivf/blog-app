import { takeEvery, call, put } from 'redux-saga/effects'

import { 
    AccountSagaAction, 
    AddInfoSagaAction, 
    FindUserSagaAction 
} from '../../redux-iterfaces/account/account'
import { SetLoadingFalseAction } from '../../reducers/posts/actions'

import {
    LOGIN, 
    LOGIN_SUCCESS, 
    CREATE_ACCOUNT, 
    CREATE_ACCOUNT_SUCCESS, 
    CHECK_AUTH,
    CHECK_AUTH_SUCCESS,
    LOGOUT,
    LOGOUT_SUCCESS,
    ADD_INFO_SUCCESS,
    ADD_INFO,
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    FOLLOW_USER,
    FAIL,
    FIND_USER,
} from '../../redux-iterfaces/account/constants'

import { Action } from './../../redux-iterfaces/index'

import { 
    apiCall, 
    checkAuth, 
    logout,
    getProfile,
    addInfo,
    followUser,
    findUser,
} from '../../../api/account'

import { checkFindUser } from './checkers'

function* createAccountSaga(action: AccountSagaAction) {
    const { data, response: error } = yield call(apiCall, action.payload, 'create')

    if (data) {
        yield put({
            type: CREATE_ACCOUNT_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: FAIL,
            payload: error.data.message
        })
    }
}

function* loginSaga(action: AccountSagaAction) {
    const { data, response: error } = yield call(apiCall, action.payload, 'login')

    if (data) {
        yield put({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: FAIL,
            payload: error.data.message
        })
    }
}

function* checkAuthSaga() {
    try {
        const { data } = yield call(checkAuth)

        yield put({
            type: CHECK_AUTH_SUCCESS,
            payload: data
        })
    } catch(e) {
        return
    }
}

function* logoutSaga() {
    try {
        yield call(logout)

        yield put({
            type: LOGOUT_SUCCESS
        })
    } catch (e) {
        return
    }
}

function* getProfileSaga(action: Action & { payload: number }) {
    try {
        const { data } = yield call(getProfile, action.payload)

        yield put({
            type: GET_PROFILE_SUCCESS,
            payload: data
        })
    } catch (e) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

function* addInfoSaga(action: AddInfoSagaAction) {
    try {
        const { data } = yield call(addInfo, action.payload)

        yield put({
            type: ADD_INFO_SUCCESS,
            payload: data
        })
    } catch (e) {
        return
    }
}

function* followUserSaga(action: Action & { payload: number }) {
    try {
        yield call(followUser, action.payload)
    } catch (e) {
        return
    }
}

function* findUserSaga(action: FindUserSagaAction) {
    try {
        const { data } = yield call(findUser, action.payload)

        yield checkFindUser(action.payload.from, data)
    } catch (error) {
        return
    } finally {
        yield put(SetLoadingFalseAction())
    }
}

export default function* accountSaga() {
    yield takeEvery(CREATE_ACCOUNT, createAccountSaga)
    yield takeEvery(LOGIN, loginSaga)
    yield takeEvery(CHECK_AUTH, checkAuthSaga)
    yield takeEvery(LOGOUT, logoutSaga)
    yield takeEvery(GET_PROFILE, getProfileSaga)
    yield takeEvery(ADD_INFO, addInfoSaga)
    yield takeEvery(FOLLOW_USER, followUserSaga)
    yield takeEvery(FIND_USER, findUserSaga)
}