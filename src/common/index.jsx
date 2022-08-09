import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Store } from './redux/Store'
import Router from './router/Router'

//All routes should be declared inside ./router/Routes
//All redux classes should be declared inside ./redux/classes and recorded inside ./redux/Store

export default props =>
    <React.StrictMode>
        <Provider store={Store}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>