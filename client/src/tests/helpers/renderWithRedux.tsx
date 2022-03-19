import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer, { RootState } from '../../redux/reducers/index'

type PropTypes = {
    component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    initialState: any
}

export const RenderWithRedux: React.FC<PropTypes> = ({ component, initialState }) => {
    const store = createStore(reducer, initialState)

    return (
        <Provider store={store}>
            {component}
        </Provider>
    )
}
