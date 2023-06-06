import React from 'react'
import { Navigate } from 'react-router-dom'
function PrivateRoute({ address, children }) {
  if (!address) {
    return <Navigate to="/" replace />
  }
  return children
}
export default PrivateRoute