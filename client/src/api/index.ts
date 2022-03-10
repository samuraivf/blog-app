import axios from "axios"

import { AccountResponse } from '../redux/redux-iterfaces/account/account'

const API = axios.create({ 
    withCredentials: true,
    baseURL: 'http://localhost:5000/' 
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
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true

        const response = await axios.get<AccountResponse>(
            'http://localhost:5000/auth/refresh', 
            { withCredentials: true }
        )
        if (response.data) {
            localStorage.setItem('token', response.data.accessToken)
            
            return API.request(originalRequest)
        }
    }
})

export default API