import React from 'react'
import { Link } from 'react-router-dom'

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

export default LoginPage
