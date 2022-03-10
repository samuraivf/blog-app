import { 
    PostComment,
    Comment,
    Post, 
    UpdatePost,
    SearchPostPayload
} from "../../redux-iterfaces/posts/posts"

import {
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    CREATE_POST, 
    LOAD_LATEST_USER_POSTS, 
    GET_POST, 
    LOAD_OLDEST_USER_POSTS ,
    LOAD_LATEST_POSTS,
    DELETE_POST,
    LOAD_OLDEST_POSTS,
    LOAD_POPULAR_POSTS,
    LOAD_POPULAR_USER_POSTS,
    LIKE_POST,
    SAVE_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
    LIKE_COMMENT,
    UPDATE_POST,
    LOAD_SAVED_USER_POSTS,
    FIND_POST,
    LOAD_FOLLOWED_POSTS,
} from '../../redux-iterfaces/posts/constants'

export const CreatePostAction = (payload: Post) => ({
    type: CREATE_POST,
    payload
})

export const UpdatePostAction = (payload: UpdatePost) => ({
    type: UPDATE_POST,
    payload
})

export const LoadLatestUserPostsAction = (payload: number) => ({
    type: LOAD_LATEST_USER_POSTS,
    payload
})

export const LoadOldestUserPostsAction = (payload: number) => ({
    type: LOAD_OLDEST_USER_POSTS,
    payload
})

export const LoadPopularUserPostsAction = (payload: number) => ({
    type: LOAD_POPULAR_USER_POSTS,
    payload
})

export const LoadSavedUserPostsAction = (payload: number) => ({
    type: LOAD_SAVED_USER_POSTS,
    payload
})

export const GetPostAction = (payload: number) => ({
    type: GET_POST,
    payload
})

export const DeletePostAction = (payload: number) => ({
    type: DELETE_POST,
    payload
})

export const LoadLatestPostsAction = (payload: number) => ({
    type: LOAD_LATEST_POSTS,
    payload
})

export const LoadOldestPostsAction = (payload: number) => ({
    type: LOAD_OLDEST_POSTS,
    payload
})

export const LoadPopularPostsAction = (payload: number) => ({
    type: LOAD_POPULAR_POSTS,
    payload
})

export const LoadFollowedPostsAction = (payload: number) => ({
    type: LOAD_FOLLOWED_POSTS,
    payload
})

export const LikePostAction = (payload: number) => ({
    type: LIKE_POST,
    payload
})

export const SavePostAction = (payload: number) => ({
    type: SAVE_POST,
    payload
})

export const AddCommentAction = (payload: Comment) => ({
    type: ADD_COMMENT,
    payload
})

export const DeleteCommentAction = (payload: PostComment) => ({
    type: DELETE_COMMENT,
    payload
})

export const LikeCommentAction = (payload: PostComment) => ({
    type: LIKE_COMMENT,
    payload
})

export const FindPostAction = (payload: SearchPostPayload) => ({
    type: FIND_POST,
    payload
})

export const SetLoadingTrueAction = () => ({
    type: SET_LOADING_TRUE
})

export const SetLoadingFalseAction = () => ({
    type: SET_LOADING_FALSE
})
