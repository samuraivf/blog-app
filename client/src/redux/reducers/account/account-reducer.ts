import { 
    AccountActionResponse, 
    AccountState, 
    AccountResponse,
    ProfileResponse
} from '../../redux-iterfaces/account/account'

import {
    LOGOUT_SUCCESS,
    ADD_INFO_SUCCESS,
    GET_PROFILE_SUCCESS,
    CREATE_ACCOUNT_SUCCESS, 
    LOGIN_SUCCESS, 
    CHECK_AUTH_SUCCESS, 
    FAIL,
    SET_USERNAME,
    FIND_USER_FROM_0_SUCCESS,
    FIND_USER_SUCCESS,
} from '../../redux-iterfaces/account/constants'

import { SAVE_POST_SUCCESS } from '../../redux-iterfaces/posts/constants'

const initialState: AccountState = { 
    user: null,
    users: [],
    profile: null,
    username: '',
    fail: '',
}

export const accountReducer = (state = initialState, action: AccountActionResponse): AccountState => {
    switch(action.type) {
        case CREATE_ACCOUNT_SUCCESS: 
        case LOGIN_SUCCESS:
        case CHECK_AUTH_SUCCESS: 
            if (isUserPayload(action.payload)) {
                localStorage.setItem('token', action.payload.accessToken)
    
                return {
                    ...state,
                    user: action.payload?.user
                }
            }

            return state
        case SAVE_POST_SUCCESS:
        case ADD_INFO_SUCCESS:
            if (isUserPayload(action.payload)) {
                return {
                    ...state,
                    user: action.payload?.user
                }
            }

            return state
        case GET_PROFILE_SUCCESS:
            if (isProfilePayload(action.payload)) {
                return {
                    ...state,
                    profile: action.payload.profile
                }
            }

            return state
        case LOGOUT_SUCCESS: 
            localStorage.removeItem('token')

            return initialState
        case FAIL:
            if (typeof action.payload === 'string') {
                return {
                    ...state,
                    fail: action.payload
                }
            }
            return state
        case SET_USERNAME: 
            if (typeof action.payload === 'string') {
                return {
                    ...state,
                    username: action.payload
                }
            }
            return state
        case FIND_USER_FROM_0_SUCCESS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    users: [...action.payload]
                }
            }

            return state
        case FIND_USER_SUCCESS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    users: [...state.users, ...action.payload]
                }
            }

            return state
        default: 
            return state
    }
}

function isUserPayload(payload: AccountResponse | ProfileResponse): payload is AccountResponse {
    return (payload as AccountResponse).user !== undefined
}

function isProfilePayload(payload: AccountResponse | ProfileResponse): payload is ProfileResponse {
    return (payload as ProfileResponse).profile !== undefined
}
