import React, { useContext, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { User } from '../../types/User'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const api = useApi()

  const signin = async (email, password) => {
    const data = await api.signin(email, password)

    if (data?.user && data?.token) {
      setUser(data.user)
      setToken(data.token)
    }
  }

  const signout = async () => {
    console.log('signout está sendo executada.')
    setUser(null)
    setToken('')
    await api.logout()
  }

  return (
    <AuthContext.Provider value={{ user, token, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
