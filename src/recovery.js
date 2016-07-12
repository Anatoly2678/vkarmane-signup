import RecoveryContainer from './components/recovery-container'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import recovery from './reducers/recovery'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

let store = createStore(recovery,
    applyMiddleware(thunkMiddleware, loggerMiddleware))

render(
    <Provider store={store}>
        <RecoveryContainer />
    </Provider>,
    document.getElementById('content')
)