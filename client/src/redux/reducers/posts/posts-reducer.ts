import { LOGOUT_SUCCESS } from '../../redux-iterfaces/account/constants'
import { 
    GET_POSTS_BY_TAG_SUCCESS,
    GET_POSTS_BY_TAG_FROM_0_SUCCESS
} from '../../redux-iterfaces/tags/constants'

import {  PostsAction, PostsState } from '../../redux-iterfaces/posts/posts'

import {
    GET_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    LIKE_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCES,
    LIKE_COMMENT_SUCCESS,
    LOAD_POSTS_SUCCESS,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_SAVED_USER_POSTS_SUCCESS,
    LOAD_FINDED_POSTS_SUCCESS,
    LOAD_FOLLOWED_POSTS_SUCCESS,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    LOAD_POSTS_FROM_0_SUCCESS,
    LOAD_USER_POSTS_FROM_0_SUCCESS,
    LOAD_FINDED_POSTS_FROM_0_SUCCESS,
    LOAD_SAVED_USER_POSTS_FROM_0_SUCCESS,
    LOAD_FOLLOWED_POSTS_FROM_0_SUCCESS,
} from '../../redux-iterfaces/posts/constants'


const initialState: PostsState = {
    posts: [],
    userPosts: [],
    savedPosts: [],
    searchPosts: [],
    followedPosts: [],
    currentPost: null,
    loading: null,
}

export const postsReducer = (state = initialState, action: PostsAction): PostsState => {
    switch(action.type) {
        case GET_POSTS_BY_TAG_FROM_0_SUCCESS:
        case LOAD_POSTS_FROM_0_SUCCESS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    posts: [...action.payload]
                }
            }

            return state
        case LOAD_USER_POSTS_FROM_0_SUCCESS: 
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    userPosts: [...action.payload]
                }
            }

            return state
        case LOAD_SAVED_USER_POSTS_FROM_0_SUCCESS: 
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    savedPosts: [ ...action.payload]
                }
            }
            
            return state
        case LOAD_FINDED_POSTS_FROM_0_SUCCESS: 
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    searchPosts: [ ...action.payload]
                }
            }

            return state
        case LOAD_FOLLOWED_POSTS_FROM_0_SUCCESS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    followedPosts: [ ...action.payload]
                }
            }

            return state
        case LOAD_POSTS_SUCCESS:
        case GET_POSTS_BY_TAG_SUCCESS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    posts: [...state.posts, ...action.payload]
                }
            }

            return state
        case LOAD_USER_POSTS_SUCCESS: 
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    userPosts: [...state.userPosts, ...action.payload]
                }
            }

            return state
        case LOAD_SAVED_USER_POSTS_SUCCESS: 
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    savedPosts: [...state.savedPosts, ...action.payload]
                }
            }
            
            return state
        case LOAD_FINDED_POSTS_SUCCESS: 
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    searchPosts: [...state.searchPosts, ...action.payload]
                }
            }

            return state
        case LOAD_FOLLOWED_POSTS_SUCCESS:
            if (Array.isArray(action.payload)) {
                return {
                    ...state,
                    followedPosts: [...state.followedPosts, ...action.payload]
                }
            }

            return state
        case GET_POST_SUCCESS:
        case LIKE_POST_SUCCESS:
            if (typeof action.payload === 'object' && !Array.isArray(action.payload)) {
                return {
                    ...state,
                    currentPost: action.payload
                }
            }

            return state
        case ADD_COMMENT_SUCCESS:
        case DELETE_COMMENT_SUCCES:
        case LIKE_COMMENT_SUCCESS:
            if (
                typeof action.payload === 'object' 
                && !Array.isArray(action.payload) 
                && state.currentPost
            ) {
                state.currentPost.comments = action.payload?.comments
            }

            return {
                ...state,
                currentPost: state.currentPost
            }
        case DELETE_POST_SUCCESS:
            if (typeof action.payload === 'number') {
                return {
                    ...state,
                    posts: state.posts.filter(post => post.id !== action.payload)
                }
            }
            return state
        case LOGOUT_SUCCESS:
            return {
                ...state,
                userPosts: [],
                savedPosts: [],
                followedPosts: []
            }
        case SET_LOADING_TRUE: 
            return {
                ...state,
                loading: true,
            }
        case SET_LOADING_FALSE: 
            return {
                ...state,
                loading: false,
            }
        default: 
            return state
    }
}
