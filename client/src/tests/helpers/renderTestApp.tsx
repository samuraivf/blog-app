import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from '../../redux/reducers/index'
import Routes from '../../routes/Router'

type PropTypes = {
    component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    initialState?: any,
    initialRoute?: string,
}

export const RenderTestApp: React.FC<PropTypes> = ({
    component, 
    initialState= {},
    initialRoute = '/',
}) => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware))

    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={[initialRoute]}>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <Routes />
                    {component}
                </Suspense>
            </MemoryRouter>
        </Provider>
    )
}
