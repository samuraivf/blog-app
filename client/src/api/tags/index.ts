import { AxiosResponse } from "axios"

import API from "../index"

import { OverviewPost } from "../../redux/redux-iterfaces/posts/posts"
import { Tag, LoadByTag } from "../../redux/redux-iterfaces/tags/tags"

export const loadTags = (): Promise<AxiosResponse<Tag[]>> => API.get('/tags')

export const getLatestPostsByTag = (
    data: LoadByTag
): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/tags/${data.arg}/latest/${data.from}`)
}

export const getOldestPostsByTag = (
    data: LoadByTag
): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/tags/${data.arg}/oldest/${data.from}`)
}

export const getPopularPostsByTag = (
    data: LoadByTag
): Promise<AxiosResponse<OverviewPost[]>> => {
    return API.get(`/tags/${data.arg}/popular/${data.from}`)
}
