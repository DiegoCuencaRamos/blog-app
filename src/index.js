import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import AppRouter, { history } from './routers/AppRouter'
import store from './store'
import { startPostsSet } from './features/posts/postsSlice'
import LoadingPage from './features/LoadingPage'
import { firebase } from './firebase'
import { login, logout } from './features/auth/authSlice'

import '../node_modules/normalize.css/normalize.css'
import './styles/styles.scss';

store.subscribe(() => {
    console.log('Store: ', store.getState())
})

const app = (
    <React.StrictMode>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </React.StrictMode>
)

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(app, document.getElementById('app'))
        hasRendered = true
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(startPostsSet()).then(() => {
            renderApp()
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        })
    } else {
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})