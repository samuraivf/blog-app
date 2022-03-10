import { combineReducers } from 'redux'

import { accountReducer } from './account/account-reducer'
import { postsReducer } from './posts/posts-reducer'
import { tagsReducer } from './tags/tags-reducer'

const reducer = combineReducers({
    account: accountReducer,
    posts: postsReducer,
    tags: tagsReducer
})

export type RootState = ReturnType<typeof reducer>

export default reducer