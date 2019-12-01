import React from 'react'
import { Route } from 'react-router-dom'
import Redirecting from './Redirecting'

const ProtectedRoute = ({
  component: Component,
  componentProps,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} {...componentProps} />
      ) : (
        <Redirecting to='/login' />
      )
    }
  />
)

export default ProtectedRoute
