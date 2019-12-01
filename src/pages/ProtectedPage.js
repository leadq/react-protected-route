import React from 'react'
import { Link } from 'react-router-dom'

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

export default ProtectedPage
