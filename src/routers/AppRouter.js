import React from 'react'
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import DashboardPage from '../features/posts/DashboardPostPage'
import CreatePage from '../features/posts/CreatePostPage'
import EditPage from '../features/posts/EditPostPage'
import ReadPage from '../features/posts/ReadPostPage'
import NotFoundPage from '../features/NotFoundPage'
import LoginPage from '../features/auth/LoginPage'

export const history = createBrowserHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute exact={true} path="/" component={LoginPage} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/create" component={CreatePage} />
                <PrivateRoute path="/edit/:id" component={EditPage} />
                <PrivateRoute path="/read/:id" component={ReadPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter