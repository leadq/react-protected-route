import './App.css'

import React, { useState } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirecting, ProtectedRoute } from './components'
import { LoginPage, PublicPage, ProtectedPage, NotFoundPage } from './pages'

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
          <Route exact path='/public' component={PublicPage} />
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
