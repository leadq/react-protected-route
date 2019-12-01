import React, { useState } from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import './App.css'

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

const ProtectedPage = ({ onClickLogout }) => {
  return (
    <React.Fragment>
      <div>PROTECTED PAGE</div>
      <div>
        You cant go login page if you are authenticated. You will be redirected
        to protected page
      </div>
      <button type='button' onClick={onClickLogout}>
        LOGOUT
      </button>
      <Link to='/login'> Try To Go Login </Link>
    </React.Fragment>
  )
}

const LoginPage = ({ onClickAuthenticateButton }) => {
  return (
    <React.Fragment>
      <div>
        Welcome my dummy LOGIN PAGE Click button for authenticate. You cant go
        /protected path unless you are authenticated
      </div>

      <div>
        <button type='button' onClick={onClickAuthenticateButton}>
          Authenticate
        </button>
        <Link to='/protected'> Try To Go Private Page </Link>
      </div>
    </React.Fragment>
  )
}

const Redirecting = ({ to }) => {
  console.log(`Redirecting to ${to}`)
  return <Redirect to={to} />
}

const NormalPage = (props) => <div>NORMAL PAGE</div>

const NotFoundPage = (props) => <div>No content</div>

const App = () => {
  const token = localStorage.getItem('token')
  const [isAuthenticated, setIsAuthenticated] = useState(
    token && token.length > 0
  )

  const onClickLogout = (e) => {
    setIsAuthenticated(false)
    localStorage.clear()
  }
  const onClickAuthenticateButton = (e) => {
    localStorage.setItem('token', 'Bearer Valid_TOKEN')
    setIsAuthenticated(true)
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path='/login'
            render={(props) => (
              <React.Fragment>
                {isAuthenticated ? (
                  <Redirecting to='/protected' />
                ) : (
                  <LoginPage
                    {...props}
                    onClickAuthenticateButton={onClickAuthenticateButton}
                  />
                )}
              </React.Fragment>
            )}
          />
          <Route exact path='/public' component={NormalPage} />
          <ProtectedRoute
            path='/protected'
            component={ProtectedPage}
            componentProps={{ onClickLogout }}
            isAuthenticated={isAuthenticated}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
