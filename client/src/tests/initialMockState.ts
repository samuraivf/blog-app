import { RootState } from '../redux/reducers'


export const initialMockState: RootState = {
    account: {
        user: null,
        users: [],
        profile: null,
        username: '',
        fail: ''
    },
    posts: {
        posts: [],
        userPosts: [],
        savedPosts: [],
        searchPosts: [],
        followedPosts: [],
        currentPost: null,
        loading: null
    },
    tags: {
        tags: [],
        tag: ''
    }
}