import React from 'react'
import { Redirect } from 'react-router-dom'

const Redirecting = ({ to }) => {
  console.log(`Redirecting to ${to}`)
  return <Redirect to={to} />
}

export default Redirecting
