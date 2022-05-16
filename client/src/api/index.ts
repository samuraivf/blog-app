import axios from 'axios'

import { AccountResponse } from '../redux/redux-iterfaces/account/account'
import { logout } from './account/index'

export const BASE_URL = 'http://localhost:5000/' 

const API = axios.create({ 
    withCredentials: true,
    baseURL: BASE_URL,
})

API.interceptors.request.use(req => {
    const token = localStorage.getItem('token')

    if (token && req.headers) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

API.interceptors.response.use(config => {
    return config
}, async error => {
    const originalRequest = error.config
    
    if (error.response.status === 401 && error.config.url === '/auth/refresh') {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')

            await logout()
        }
    }

    if (error.response.status === 401 && error.config) {
        const response = await axios.get<AccountResponse>(
            `${BASE_URL}auth/refresh`, 
            { withCredentials: true }
        )
        if (response.data) {
            localStorage.setItem('token', response.data.accessToken)
            return API.request(originalRequest)
        }
    }
})

export default API