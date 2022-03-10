import React from 'react'

import Loading from './../Loading/Loading'
import NoResults from './../NoResults/NoResults'

type PropTypes = {
    loading: boolean | null
    length: number
}

const CheckLoading: React.FC<PropTypes> = ({ loading, length }) => {
    return (
        <>
            {
                loading === true && <Loading />
            }
            {
                (loading === false && !length) && <NoResults />
            }
        </>
    )
}

export default CheckLoading