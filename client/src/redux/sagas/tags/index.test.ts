import { put, call } from 'redux-saga/effects'

import { 
    GET_POSTS_BY_TAG_FROM_0_SUCCESS, 
    GET_POSTS_BY_TAG_SUCCESS,
    GET_TAGS_SUCCESS,
    GET_LATEST_POSTS_BY_TAG,
    GET_OLDEST_POSTS_BY_TAG,
    GET_POPULAR_POSTS_BY_TAG
} from './../../redux-iterfaces/tags/constants'
import { 
    loadTags, 
    getLatestPostsByTag,
    getOldestPostsByTag,
    getPopularPostsByTag
} from './../../../api/tags/index'
import { SetLoadingFalseAction } from '../../reducers/posts/actions'
import { SagaAction } from '../../redux-iterfaces/tags/tags'

import { 
    checkPosts, 
    getTagsSaga,
    getLatestPostsByTagSaga,
    getOldestPostsByTagSaga,
    getPopularPostsByTagSaga
} from '.'

describe('test tegs sagas', () => {
    const posts = [
        { id: 1, name: 'post1' },
        { id: 2, name: 'post2' },
        { id: 3, name: 'post3' },
    ]

    it('should test checker from 0', () => {
        const g = checkPosts(0, posts)

        expect(g.next().value).toEqual(
            put({
                type: GET_POSTS_BY_TAG_FROM_0_SUCCESS,
                payload: posts
            })
        )
        expect(g.next().done).toBe(true)
    })

    it('should test checker from 10', () => {
        const g = checkPosts(10, posts)

        expect(g.next().value).toEqual(
            put({
                type: GET_POSTS_BY_TAG_SUCCESS,
                payload: posts
            })
        )
        expect(g.next().done).toBe(true)
    })

    it('should test getTags saga', () => {
        const g = getTagsSaga()
        
        const data: any = [{id: 1, name: 'tag'}]

        expect(g.next().value).toEqual(call(loadTags))

        expect(g.next({ data }).value).toEqual(
            put({
                type: GET_TAGS_SUCCESS,
                payload: data
            })
        )

        expect(g.next().value).toEqual(
            put(SetLoadingFalseAction())
        )

        expect(g.next().done).toBe(true)
    })

    it('should test getLatestPostsByTagSaga', () => {
        const action: SagaAction = {
            type: GET_LATEST_POSTS_BY_TAG,
            payload: {
                arg: 'post',
                from: 0,
            }
        }

        const g = getLatestPostsByTagSaga(action)

        expect(g.next().value).toEqual(call(getLatestPostsByTag, action.payload))

        const data = posts

        expect(g.next({ data }).value).toEqual(checkPosts(action.payload.from, posts))

        expect(g.next().value).toEqual(
            put(SetLoadingFalseAction())
        )

        expect(g.next().done).toBe(true)
    })

    it('should test getOldestPostsByTagSaga', () => {
        const action: SagaAction = {
            type: GET_OLDEST_POSTS_BY_TAG,
            payload: {
                arg: 'post',
                from: 0,
            }
        }

        const g = getOldestPostsByTagSaga(action)

        expect(g.next().value).toEqual(call(getOldestPostsByTag, action.payload))

        const data = posts

        expect(g.next({ data }).value).toEqual(checkPosts(action.payload.from, posts))

        expect(g.next().value).toEqual(
            put(SetLoadingFalseAction())
        )

        expect(g.next().done).toBe(true)
    })

    it('should test getPopularPostsByTagSaga', () => {
        const action: SagaAction = {
            type: GET_POPULAR_POSTS_BY_TAG,
            payload: {
                arg: 'post',
                from: 0,
            }
        }

        const g = getPopularPostsByTagSaga(action)

        expect(g.next().value).toEqual(call(getPopularPostsByTag, action.payload))

        const data = posts

        expect(g.next({ data }).value).toEqual(checkPosts(action.payload.from, posts))

        expect(g.next().value).toEqual(
            put(SetLoadingFalseAction())
        )

        expect(g.next().done).toBe(true)
    })
})
