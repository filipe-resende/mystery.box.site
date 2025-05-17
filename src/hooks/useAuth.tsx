import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Error, Response } from '@/types/Reponse'
import { UserAuth } from '@/types/User'

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
})

export function useAuthApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>(null)

  const login = async (email: string, password: string): Promise<UserAuth> => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post<Response<UserAuth>>('/user/signIn', {
        email,
        password
      })
      if (response.data.isSuccess) {
        return response.data.value
      } else {
        setError(response.data.error)
      }
    } catch (err: any) {
      const axiosErr = err as AxiosError
      console.error(axiosErr)
    } finally {
      setLoading(false)
    }
  }

  const authorize = async (): Promise<UserAuth> => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post<Response<UserAuth>>('/user/validate')
      if (response.data.isSuccess) {
        return response.data.value
      } else {
        setError(response.data.error)
      }
    } catch (err) {
      const axiosErr = err as AxiosError
      console.error(axiosErr)
    } finally {
      setLoading(false)
    }
  }

  const logoff = async (): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post<Response<null>>('/user/logout')
      if (response.data?.isSuccess) {
        return true
      } else {
        setError(response.data.error)
        return false
      }
    } catch (err: unknown) {
      const axiosErr = err as AxiosError
      console.error('Erro no logout:', axiosErr)
      setError({ message: 'Erro ao sair', code: 'LOGOUT_ERROR' })
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    authorize,
    logoff,
    loading,
    error
  }
}
