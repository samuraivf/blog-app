import { tagsReducer } from './tags-reducer'
import { TagsInitialState, Tag } from '../../redux-iterfaces/tags/tags'
import { GET_TAGS_SUCCESS, SET_TAG } from '../../redux-iterfaces/tags/constants'

const initialState: TagsInitialState = {
    tags: [],
    tag: ''
}

describe('test tags reducer', () => {
    it('should test invalid case', () => {
        const invalidAction = () => ({
            type: 'INVALID_TYPE',
            payload: ''
        })

        expect(tagsReducer(initialState, invalidAction())).toBe(initialState)
    })

    it('should test GET_TAGS_SUCCESS', () => {
        const tags: Tag[] = [
            { id: 1, name: 'tag' },
            { id: 2, name: 'tag2' }
        ]

        const action = (payload: Tag[]) => ({
            type: GET_TAGS_SUCCESS,
            payload
        })

        expect(tagsReducer(initialState, action(tags))).toEqual({ tags, tag: '' })
    })

    it('should test SET_TAG', () => {
        const tag = 'tag'

        const action = (payload: string) => ({
            type: SET_TAG,
            payload
        })

        expect(tagsReducer(initialState, action(tag))).toEqual({ tags: [], tag })
    })
})
