import { TagsAction, TagsInitialState } from "../../redux-iterfaces/tags/tags"
import { GET_TAGS_SUCCESS, SET_TAG } from "../../redux-iterfaces/tags/constants"

const initialState: TagsInitialState = {
    tags: [],
    tag: ''
}

export const tagsReducer = (state = initialState, action: TagsAction): TagsInitialState => {
    switch(action.type) {
        case GET_TAGS_SUCCESS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    tags: [...action.payload]
                }
            }

            return state
        case SET_TAG:
            if (typeof action.payload === 'string') {
                return {
                    ...state,
                    tag: action.payload
                }
            }

            return state
        default:
            return state
    }
}
