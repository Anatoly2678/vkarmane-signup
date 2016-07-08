import RecoveryContainer from './components/recovery-container'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import recovery from './reducers/recovery'


let store = createStore(recovery)

render(
    <Provider store={store}>
        <RecoveryContainer />
    </Provider>,
    document.getElementById('content')
)