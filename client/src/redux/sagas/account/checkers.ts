import { put } from "redux-saga/effects"

import { UserShortInfo } from "../../redux-iterfaces/account/account"
import { FIND_USER_FROM_0_SUCCESS, FIND_USER_SUCCESS } from './../../redux-iterfaces/account/constants'

export function* checkFindUser(from: number, data: UserShortInfo[]) {
    if (!from) {
        yield put({
            type: FIND_USER_FROM_0_SUCCESS,
            payload: data
        })
    } else {
        yield put({
            type: FIND_USER_SUCCESS,
            payload: data
        })
    }
}
