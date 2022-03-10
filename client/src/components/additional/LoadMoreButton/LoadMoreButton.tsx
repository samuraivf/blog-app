import React from 'react'
import { useDispatch } from 'react-redux'

import { LoadMoreContainer, LoadButton } from './styles'

type PropTypes = {
    from: number
    checkPathname?: (from: number) => void
    load?: (payload: number) => void
}

const LoadMoreButton: React.FC<PropTypes> = ({ checkPathname, from, load }) => {
    const dispatch = useDispatch()
    let onClick: () => void

    if (checkPathname) {
        onClick = (): void => {
            checkPathname(from)
        }
    
        return (
            <LoadMoreContainer>
                <LoadButton onClick={onClick}>LOAD MORE</LoadButton>
            </LoadMoreContainer>
        )
    }

    if (load) {
        onClick = (): void => {
            dispatch(load(from))
        }

        return (
            <LoadMoreContainer>
                <LoadButton onClick={onClick}>LOAD MORE</LoadButton>
            </LoadMoreContainer>
        )
    }
    
    return null
}

export default LoadMoreButton