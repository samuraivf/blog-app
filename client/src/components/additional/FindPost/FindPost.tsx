import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components'

import {
    FindTagBox,
    FindTagInput as FindPostInput,
} from './../FindTag/styles'

const FindPostBox = styled(FindTagBox)`
    top: 18.5rem;
    margin-bottom: 5rem;
`

const FindPost: React.FC = () => {
    const [ query, setQuery ] = useState('')
    const history = useHistory()

    const findResults = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && query) {
            setQuery('')
            history.push(`/search/${query}`)
        }
    }

    return (
        <FindPostBox>
            <h2>Find a Post</h2>
            <FindPostInput 
                type="text" 
                placeholder='Search...' 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={(e) => findResults(e)}
            />
        </FindPostBox>
    )
}

export default FindPost
