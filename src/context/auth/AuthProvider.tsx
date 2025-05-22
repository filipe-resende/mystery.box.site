import React, { JSX, useContext, useEffect, useState } from 'react'
import { useAuthApi } from '@/hooks/useAuth'
import { User } from '@/types/User'
import { AuthContext } from './AuthContext'
import { RequestReponse } from '@/hooks/useUser'
import Cookies from 'js-cookie'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const { login, logoff, authorize } = useAuthApi()

  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const cookieToken = Cookies.get('access_token')
    const localToken = localStorage.getItem('access_token')

    const resolvedToken = cookieToken || localToken

    if (resolvedToken) {
      setToken(resolvedToken)
      validate()
    }
  }, [])

  const signin = async (email, password): Promise<RequestReponse> => {
    const reponse = await login(email, password)
    if (reponse?.user && reponse?.token) {
      setUser(reponse.user)
      setToken(reponse.token)
      localStorage.setItem('access_token', reponse.token)
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
    if (user) {
      setUser(null)
      setToken(null)
      localStorage.removeItem('access_token')
      Cookies.remove('access_token')
      await logoff()
    }
  }

  const validate = async () => {
    const userData = await authorize()
    if (userData?.user && userData?.token) {
      setUser(userData.user)
      setToken(userData.token)
      localStorage.setItem('access_token', userData.token)
    } else {
      signout()
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
