import React, { useContext, useEffect, useState } from 'react'
import { useAuthApi } from '@/hooks/useAuth'
import { User } from '@/types/User'
import { AuthContext } from './AuthContext'
import { RequestReponse } from '@/hooks/useUser'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const { login, authorize } = useAuthApi()

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      validate()
    }
  }, [])

  const signin = async (email, password): Promise<RequestReponse> => {
    const reponse = await login(email, password)
    if (reponse?.user && reponse?.token) {
      setUser(reponse.user)
      setToken(reponse.token)
      localStorage.setItem('token', reponse.token)
      return {
        status: 200,
        error: '',
        message: 'Autenticação realizada com sucesso!',
        hasError: false
      }
    } else {
      return {
        status: 400,
        error: '',
        message: 'Usuário ou senha inválidos',
        hasError: true
      }
    }
  }

  const signout = async () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
  }

  const validate = async () => {
    const userData = await authorize()
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
