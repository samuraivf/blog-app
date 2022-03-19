import axios, { AxiosResponse } from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { addInfo, apiCall, checkAuth, logout, getProfile, followUser, findUser } from './index'
import API  from './../index'

describe('test account api calls', () => {
    const user = {
        id: 1,
        username: 'username',
    }

    let mock: MockAdapter

    beforeAll(() => {
        mock = new MockAdapter(API)
    })

    afterEach(() => {
        mock.reset()
    })

    it('should test good apiCall', async () => {
        const mockedResponse: AxiosResponse = {
            data: {
                user,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        }

        axios.post = jest.fn().mockResolvedValue(mockedResponse)

        expect(axios.post).not.toBeCalled()
        const data = await apiCall({ email: 'email@gmail.com', password: '1234' }, 'login')

        expect(axios.post).toHaveBeenCalled()
        expect(data).toEqual(mockedResponse)
    })

    it('should test error apiCall', async () => {
        const mockedResponse = {
            response: {
                data: {
                    message: 'Unauthorized',
                },
            },
        }

        axios.post = jest.fn().mockRejectedValue(mockedResponse)

        expect(axios.post).not.toBeCalled()
        const data = await apiCall({ email: 'email@gmail.com', password: '1234' }, 'login')

        expect(axios.post).toHaveBeenCalled()
        expect(data).toEqual(mockedResponse)
    })

    it('should test checkAuth', async () => {
        const mockedData = {
            data: {
                user,
                accessToken: 'asd',
            },
        }

        mock.onGet('/auth/refresh').reply(200, mockedData)

        const result = await checkAuth()

        expect(mock.history.get[0].url).toEqual('/auth/refresh')
        expect(result.data).toEqual(mockedData)
    })

    it('should test logout', async () => {
        const mockedData = {
            data: true
        }

        mock.onGet('/auth/logout').reply(200, mockedData)

        const result = await logout()

        expect(mock.history.get[0].url).toEqual('/auth/logout')
        expect(result.data).toEqual(mockedData)
    })

    it('should test addInfo', async () => {
        const mockedData = {
            data: true
        }

        const mockedUserInfo = {
            username: 'user-1',
            description: 'description',
            location: 'location'
        }

        mock.onPost('/auth/add-info', mockedUserInfo).reply(200, mockedData)

        const result = await addInfo(mockedUserInfo)

        expect(mock.history.post[0].url).toEqual('/auth/add-info')
        expect(result.data).toEqual(mockedData)
    })

    it('should test getProfile', async () => {
        const id = 1

        const mockedData = {
            data: user
        }

        mock.onGet(`/auth/profile/${id}`).reply(200, mockedData)

        const result = await getProfile(id)

        expect(mock.history.get[0].url).toEqual(`/auth/profile/${id}`)
        expect(result.data).toEqual(mockedData)
    })

    it('should test followUser', async () => {
        const id = 1

        const mockedData = {
            data: user
        }

        mock.onGet(`/user/follow/${id}`).reply(200, mockedData)

        const result = await followUser(id)

        expect(mock.history.get[0].url).toEqual(`/user/follow/${id}`)
        expect(result.data).toEqual(mockedData)
    })

    it('should test findUser', async () => {
        const mockedData = {
            data: user
        }

        mock.onGet(`/user/find/${user.username}/0`).reply(200, mockedData)

        const result = await findUser({ username: user.username, from: 0 })

        expect(mock.history.get[0].url).toEqual(`/user/find/${user.username}/0`)
        expect(result.data).toEqual(mockedData)
    })
})
