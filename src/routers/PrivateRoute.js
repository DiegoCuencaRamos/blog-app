import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../features/Header'

export const PrivateRoute = ({
   isAuthenticated,
   component: Component,
   ...rest 
}) => (
    <Route {...rest} component={(props => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    ))} />
)

const mapStateToPros = (state, ownProps) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToPros)(PrivateRoute)