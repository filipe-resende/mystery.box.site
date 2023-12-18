import React, { useContext, useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { User } from '../../types/User'
import { AuthContext } from './AuthContext'
import { RequestReponse } from '../../services/userService'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const api = useApi()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      validate(token)
    }
  }, [])

  const signin = async (email, password): Promise<RequestReponse> => {
    const reponse = await api.signin(email, password)
    if (reponse?.user && reponse?.token) {
      setUser(reponse.user)
      setToken(reponse.token)
      localStorage.setItem('token', reponse.token)
      return {
        status: 200,
        error: '',
        message: '',
        hasError: false
      }
    } else {
      return reponse
    }
  }

  const signout = async () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
  }

  const validate = async (token: string) => {
    const userData = await api.validate(token)
    if (userData?.user && userData?.token) {
      setUser(userData.user)
      setToken(userData.token)
      localStorage.setItem('token', userData.token)
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, validate, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
