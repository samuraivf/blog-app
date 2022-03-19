import React from 'react'

import {
    Switch,
    Route
} from 'react-router-dom'

const Account = React.lazy(() => import('../components/Account/Account'))
const Home = React.lazy(() => import('../components/Home/Home'))
const MyPosts = React.lazy(() => import('../components/MyPosts/MyPosts'))
const WritePost = React.lazy(() => import('../components/Write/Write'))
const PostContent = React.lazy(() => import('../components/PostContent/PostContent'))
const Tags = React.lazy(() => import('../components/Tags/Tags'))
const TagPage = React.lazy(() => import('../components/TagPage/TagPage'))
const Saved = React.lazy(() => import('../components/Saved/Saved'))
const EditPost = React.lazy(() => import('../components/Edit/Edit'))
const User = React.lazy(() => import('../components/User/User'))
const Search = React.lazy(() => import('../components/Search/Search'))
const FollowedPosts = React.lazy(() => import('../components/FollowedPosts/FollowedPosts'))
const NotFound = React.lazy(() => import('../components/NotFound/NotFound'))
const NotAuthorized = React.lazy(() => import('../components/NotAuthorized/NotAuthorized'))
const Users = React.lazy(() => import('../components/Users/Users'))


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
            <Route path='/oldest' exact>
                <Home />
            </Route>
            <Route path='/popular' exact>
                <Home />
            </Route>
            <Route path='/account' exact>
                <Account />
            </Route>
            <Route path='/write' exact>
                <WritePost />
            </Route>
            <Route path='/my-posts' exact>
                <MyPosts />
            </Route>
            <Route path='/my-posts/oldest' exact>
                <MyPosts />
            </Route>
            <Route path='/my-posts/popular' exact>
                <MyPosts />
            </Route>
            <Route path='/followed-posts' exact>
                <FollowedPosts />
            </Route>
            <Route path='/tags' exact>
                <Tags />
            </Route>
            <Route path='/saved' exact>
                <Saved />
            </Route>
            <Route path='/users/:username' exact>
                <Users />
            </Route>
            <Route path='/search/:q' exact>
                <Search />
            </Route>
            <Route path='/tags/:tag' exact>
                <TagPage />
            </Route>
            <Route path='/tags/:tag/oldest' exact>
                <TagPage />
            </Route>
            <Route path='/tags/:tag/popular' exact>
                <TagPage />
            </Route>
            <Route path='/posts/edit/:postid' exact>
                <EditPost />
            </Route>
            <Route path='/posts/:postid' exact>
                <PostContent />
            </Route>
            <Route path='/user/:userid' exact>
                <User />
            </Route>
            <Route path='/not-authorized' exact>
                <NotAuthorized />
            </Route>
            <Route path='*'>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default Routes