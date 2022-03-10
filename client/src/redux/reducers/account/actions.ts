import { AccountInfoData, FindUserPayload, UserInfo } from '../../redux-iterfaces/account/account'
import { 
    CREATE_ACCOUNT, 
    LOGIN, 
    CHECK_AUTH, 
    LOGOUT,
    ADD_INFO,
    GET_PROFILE,
    FOLLOW_USER,
    SET_USERNAME,
    FIND_USER,
} from '../../redux-iterfaces/account/constants'

export const createAccountAction = (payload: AccountInfoData) => ({
    type: CREATE_ACCOUNT,
    payload: payload 
})

export const loginAction = (payload: AccountInfoData) => ({
    type: LOGIN,
    payload: payload 
})

export const CheckAuthAction = () => ({
    type: CHECK_AUTH
})

export const LogoutAction = () => ({
    type: LOGOUT
})

export const GetProfileAction = (payload: number) => ({
    type: GET_PROFILE,
    payload
})

export const AddInfoAction = (payload: UserInfo) => ({
    type: ADD_INFO,
    payload
})

export const FollowUserAction = (payload: number) => ({
    type: FOLLOW_USER,
    payload
})

export const SetUsernameAction = (payload: string) => ({
    type: SET_USERNAME,
    payload
})

export const FindUserAction = (payload: FindUserPayload) => ({
    type: FIND_USER,
    payload
})
