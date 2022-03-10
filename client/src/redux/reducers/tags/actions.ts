import { 
    GET_TAGS, 
    GET_LATEST_POSTS_BY_TAG, 
    GET_POPULAR_POSTS_BY_TAG, 
    GET_OLDEST_POSTS_BY_TAG ,
    SET_TAG,
} from "../../redux-iterfaces/tags/constants"
import { LoadByTag } from './../../redux-iterfaces/tags/tags'

export const GetTagsAction = () => ({
    type: GET_TAGS,
})

export const GetLatestPostsByTagAction = (payload: LoadByTag) => ({
    type: GET_LATEST_POSTS_BY_TAG,
    payload
})

export const GetPopularPostsByTagAction = (payload: LoadByTag) => ({
    type: GET_POPULAR_POSTS_BY_TAG,
    payload
})

export const GetOldestPostsByTagAction = (payload: LoadByTag) => ({
    type: GET_OLDEST_POSTS_BY_TAG,
    payload
})

export const SetTagAction = (payload: string) => ({
    type: SET_TAG,
    payload
})