import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { useAppSelector } from '../../redux/hooks'
import { GetTagsAction, SetTagAction } from './../../redux/reducers/tags/actions'
import { SetLoadingTrueAction } from '../../redux/reducers/posts/actions'

import { RootBox } from '../styled-components/RootBox'
import { TagBox, TagName, TagsContainer, MainContainer, Title } from './styles'

import LoadingPage from '../additional/LoadingPage/LoadingPage'

const Tags: React.FC = () => {
    const dispatch = useDispatch()
    const { tags } = useAppSelector(state => state.tags)
    const { loading } = useAppSelector(state => state.posts)
    const history = useHistory()

    useEffect(() => {
        dispatch(SetLoadingTrueAction())
        dispatch(GetTagsAction())
    }, [])

    if (loading) {
        return <LoadingPage />
    }

    const tagPage = (name: string): void => {
        dispatch(SetTagAction(name))
        history.push(`/tags/${name}`)
    }

    return (
        <RootBox>
            <MainContainer>
                <Title>TOP 100 Most Popular Tags</Title>
                <TagsContainer>
                    { tags && tags.map((tag) => (
                        <TagBox key={tag.id}>
                            <TagName onClick={() => tagPage(tag.name)}>#{tag.name}</TagName>
                        </TagBox>
                    )) }
                </TagsContainer>
            </MainContainer>
        </RootBox>
    )
}

export default Tags