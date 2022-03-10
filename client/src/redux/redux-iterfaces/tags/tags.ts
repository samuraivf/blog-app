import { Action } from './../index'

export interface Tag {
    id: number
    name: string
}

export interface TagsInitialState {
    tags: Tag[]
    tag: string
}

export interface TagsAction extends Action {
    payload: Tag[] | string
}

export interface SagaAction extends Action {
    payload: LoadByTag
}

export interface LoadByTag {
    arg: string
    from: number
}
