import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'

import { SetTagAction } from './../../../redux/reducers/tags/actions'

import { FindTagBox, FindTagInput } from './styles'

const FindTag: React.FC = () => {
    const [tag, setTag] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    const findTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tag) {
            history.push(`/tags/${tag}`)
            dispatch(SetTagAction(tag))
            setTag('')
        }
    }

    return (
        <FindTagBox>
            <h2>Find a Tag</h2>
            <FindTagInput 
                placeholder='Search...' 
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={(e) => findTag(e)}
            />
        </FindTagBox>
    )
}

export default FindTag
