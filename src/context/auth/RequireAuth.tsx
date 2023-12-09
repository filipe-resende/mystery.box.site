import React from 'react'

import Login from '../../pages/login/login'
import { useAuth } from './AuthProvider'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return children
}
