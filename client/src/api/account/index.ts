import axios, { AxiosResponse } from 'axios'

import { 
    AccountInfoData, 
    AccountResponse, 
    FindUserPayload, 
    Profile, 
    UserInfo, 
    UserShortInfo
} from '../../redux/redux-iterfaces/account/account'

import API from './../index'

export const apiCall = async (
    data: AccountInfoData, 
    url: string
) => {
        return axios.post(
            `http://localhost:5000/auth/${url}`, 
            data,
            { withCredentials: true }
            ).then((response) => response)
            .catch(error => error)
}

export const checkAuth = (): Promise<AxiosResponse<AccountResponse>> => API.get('/auth/refresh')

export const logout = (): Promise<AxiosResponse<any>> => API.get('/auth/logout')

export const addInfo = (data: UserInfo): Promise<AxiosResponse<Profile>> => API.post('/auth/add-info', data)

export const getProfile = (id: number): Promise<AxiosResponse<Profile>> => API.get(`/auth/profile/${id}`)

export const followUser = (id: number): Promise<AxiosResponse<boolean>> => API.get(`/user/follow/${id}`)

export const findUser = (data: FindUserPayload): Promise<UserShortInfo[]> => {
    return API.get(`/user/find/${data.username}/${data.from}`)
}
