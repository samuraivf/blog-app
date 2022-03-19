import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
)

export type AppDispatch = typeof store.dispatch

sagaMiddleware.run(rootSaga)

export default store
