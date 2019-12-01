import React, { useState } from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
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
        <Redirect to='/login' />
      )
    }
  />
)

const ProtectedPage = ({ onClickLogout }) => {
  return (
    <React.Fragment>
      <div>PROTECTED PAGE</div>
      <button type='button' onClick={onClickLogout}>
        LOGOUT
      </button>
    </React.Fragment>
  )
}

const LoginPage = ({ onClickAuthenticateButton }) => {
  return (
    <React.Fragment>
      <span>Welcome my dummy LOGIN PAGE Click button for authenticate</span>
      <div>
        <button type='button' onClick={onClickAuthenticateButton}>
          Authenticate
        </button>
      </div>
    </React.Fragment>
  )
}

const NormalPage = (props) => <div>NORMAL PAGE</div>

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
                  <Redirect to='/' />
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
            componentProps={{ onClickLogout }}
            isAuthenticated={isAuthenticated}
            component={ProtectedPage}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
