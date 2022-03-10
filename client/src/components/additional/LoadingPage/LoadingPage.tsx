import React from 'react'

import { NotFoundBox as LoadingBox } from './../../NotFound/styles'

import Loading from './../Loading/Loading'

const LoadingPage: React.FC = () => {
    return (
        <LoadingBox>
            <Loading />
        </LoadingBox>
    )
}

export default LoadingPage
